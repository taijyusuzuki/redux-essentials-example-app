import { client } from '../../api/client';
import { RootState } from '@/app/store';
import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { isNotifications } from '../../foundation/utils';

export interface Notifications {
  id: string,
  user: string,
  date: string,
  message: string,
  isNew: boolean,
  read: boolean
};

const notificationsAdapter = createEntityAdapter<Notifications>({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = notificationsAdapter.getInitialState();

export const fetchNotifications = createAsyncThunk<
  Notifications[],
  undefined,
  { state: RootState }
>(
  'notifications/fetchNotifications',
  async (_, { getState }: { getState: () => RootState }) => {
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : '';
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    );
    return response.data;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead(state) {
      Object.values(state.entities).forEach(notification => {
        if (isNotifications(notification)) {
          notification.read = true
        }
      })
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<Notifications[]>) => {
      notificationsAdapter.upsertMany(state, action.payload);
      Object.values(state.entities).forEach(notification => {
        if (isNotifications(notification)) {
          // Any notifications we've read are no longer new
          notification.isNew = !notification.read;
        }
      });
    });
  }
});

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const { selectAll: selectAllNotifications } = notificationsAdapter.getSelectors((state: RootState) => state.notifications);
