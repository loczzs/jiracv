import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskAPI from "apis/taskAPI";

const initialState = {
  data1: [],
  isLoading: null,
  error: "",
  getall: [],
  getallpri: [],
  getalltas: [],
  updatetask: [],
  comment: [],
  listMemberz:[]
};

export const getProjectDetails = createAsyncThunk(
  "task/getProjectDetails",
  async (title, { rejectWithValue }) => {
    try {
      const data = await taskAPI.getProjectDetail(title?.taskId, title?.acces);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createTask = createAsyncThunk(
  "task/createTask",
  async (title, { rejectWithValue }) => {
    try {
      const data = await taskAPI.createTask(title.values, title.acce);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAll = createAsyncThunk(
  "task/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await taskAPI.getAll();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllpri = createAsyncThunk(
  "task/getAllpri",
  async (projectId, { rejectWithValue }) => {
    try {
      const data = await taskAPI.getAllpri(projectId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAlltas = createAsyncThunk(
  "task/getAlltas",
  async (_, { rejectWithValue }) => {
    try {
      const data = await taskAPI.getAlltas();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeTaskz = createAsyncThunk(
  "task/removetask",
  async (title, { rejectWithValue, dispatch }) => {
    console.log(title);
    try {
      const data = await taskAPI.removeTask(title.taskIds, title.acce);
      dispatch(getProjectDetails({ taskId: title.taskId, acces: title.acce }));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTaskDetail = createAsyncThunk(
  "task/getTaskDetail",
  async (title, { rejectWithValue }) => {
    try {
      const data = await taskAPI.getTaskDetail(title.taskId, title.acce);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTasks = createAsyncThunk(
  "task/updateTasks",
  async (title, { rejectWithValue }) => {
    try {
      const data = await taskAPI.updateTasks(title.values, title.acces);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllComment = createAsyncThunk(
  "task/getAllComment",
  async (taskId, { rejectWithValue }) => {
    try {
      const data = await taskAPI.getAllComment(taskId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const insertComment = createAsyncThunk(
  "task/insertComment",
  async (title, { rejectWithValue,dispatch }) => {
    try {
      const data = await taskAPI.insertComment(title.values, title.acces);
      dispatch(getAllComment(title.values.taskId))
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const deleteComment = createAsyncThunk(
  "task/deleteComment",
  async (title, { rejectWithValue,dispatch }) => {
console.log(title);
    try {
      const data = await taskAPI.deleteComment(title.commentId, title.acces);
      dispatch(getAllComment(title.taskId))
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateComment = createAsyncThunk(
  "task/updateComment",
  async (title, { rejectWithValue,dispatch }) => {
    try {
      const data = await taskAPI.updateComment(title.values.id, title.values.contentComment,title.acces);
      dispatch(getAllComment(title.values.taskId))
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const taskSlices = createSlice({
  name: "task",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getProjectDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProjectDetails.fulfilled, (state, { payload }) => {
      state.data1 = payload;
      
      state.isLoading = false;
    });
    builder.addCase(getProjectDetails.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(getAll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAll.fulfilled, (state, { payload }) => {
      state.getall = payload;
      state.isLoading = false;
    });
    builder.addCase(getAll.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(getAllpri.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllpri.fulfilled, (state, { payload }) => {
      state.getallpri = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllpri.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(getAlltas.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAlltas.fulfilled, (state, { payload }) => {
      state.getalltas = payload;
      state.isLoading = false;
    });
    builder.addCase(getAlltas.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(getTaskDetail.pending, (state) => {
      state.isLoading = true;
      state.listMember=[]
      state.updatetask = [];
    });
    builder.addCase(getTaskDetail.fulfilled, (state, { payload }) => {
      state.updatetask = payload;
            state.listMemberz= payload.assigness.map((item)=>{
        return `${item.id}`
      }); 
      state.isLoading = false;
    });
    builder.addCase(getTaskDetail.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(getAllComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllComment.fulfilled, (state, { payload }) => {
      state.comment = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllComment.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
  },
});

export default taskSlices.reducer;
