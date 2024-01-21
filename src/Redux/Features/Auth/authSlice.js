import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const customer = JSON.parse(localStorage.getItem('customer'))

const initialState = {
    customer: customer ? customer : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const register = createAsyncThunk(
    'auth/register',
    async (customer, thunkAPI) => {
        try {
            return await authService.register(customer)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (customer, thunkAPI) => {
        try {
            return await authService.login(customer)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//facebook

export const registerWithFacebook = createAsyncThunk(
    'auth/registerWithFacebook',
    async (customer, thunkAPI) => {
        try {
            return await authService.registerWithFacebook(customer)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const loginWithFacebook = createAsyncThunk(
    'auth/loginWithFacebook',
    async (customer, thunkAPI) => {
        try {
            return await authService.loginWithFacebook(customer)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)
//google

export const registerWithGoogle = createAsyncThunk(
    'auth/registerWithGoogle',
    async (customer, thunkAPI) => {
        try {
            return await authService.registerWithGoogle(customer)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const loginWithGoogle = createAsyncThunk(
    'auth/loginWithGoogle',
    async (customer, thunkAPI) => {
        try {
            return await authService.loginWithGoogle(customer)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const addPhoneNumber = createAsyncThunk(
    'auth/addPhoneNumber',
    async (customer, thunkAPI) => {
        try {
            return await authService.addPhoneNumber(customer)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await authService.logout()
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        },
        verify: (state) => {
            state.customer.isVerified = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.customer = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                state.customer = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.customer = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                state.customer = null
            })
            .addCase(registerWithFacebook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerWithFacebook.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.customer = action.payload
            })
            .addCase(registerWithFacebook.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                state.customer = null
            })
            .addCase(loginWithFacebook.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginWithFacebook.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.customer = action.payload
            })
            .addCase(loginWithFacebook.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                state.customer = null
            })
            .addCase(registerWithGoogle.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerWithGoogle.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.customer = action.payload
            })
            .addCase(registerWithGoogle.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                state.customer = null
            })
            .addCase(loginWithGoogle.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.customer = action.payload
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                state.customer = null
            })
            .addCase(addPhoneNumber.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addPhoneNumber.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.customer = action.payload
            })
            .addCase(addPhoneNumber.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.message = action.payload
                state.customer = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.customer = null
            })
    }
})

export const { reset, verify } = authSlice.actions;
export default authSlice.reducer;