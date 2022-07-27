import { client } from '../../api/client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Users {
  id: string,
  name: string
};

const initialState: Users[] = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' }
];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users');
  return response.data;
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<Users[]>) => {
      return action.payload
    })
  }
});

export const {} = usersSlice.actions

export default usersSlice.reducer