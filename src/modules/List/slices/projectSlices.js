import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectAPI from "apis/projectAPI";
import { getProjectDetails } from "modules/List/slices/taskSlices";

const initialState = {
  data: [],
  isLoading: true,
  error: "",
  update: [],
  list: [],
  listuser:[],
};

export const getAllProject = createAsyncThunk(
  "project/getAllProject",
  async (acces, { rejectWithValue }) => {
    try {
      const data = await projectAPI.getAllProject();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk(
  "project/getUser",
  async (acces, { rejectWithValue }) => {
    try {
      const data = await projectAPI.getUser(acces);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProjectAuthorize = createAsyncThunk(
  "project/createProject",
  async (title, { rejectWithValue }) => {
    try {
      const data = await projectAPI.createProjectAuthorize(
        title.values,
        title.acce
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (title, { rejectWithValue, dispatch }) => {
    try {
      const data = await projectAPI.deleteProject(title.projectId, title.acces);
      dispatch(getAllProject());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ProjectCategory = createAsyncThunk(
  "project/ProjectCategory",
  async (_, { rejectWithValue }) => {
    try {
      const dataz = await projectAPI.ProjectCategory();
      return dataz;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProjectDetail = createAsyncThunk(
  "project/getProjectDetail",
  async (title, { rejectWithValue }) => {
    try {
      const data = await projectAPI.getProjectDetail(
        title.projectId,
        title.acce
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProjects = createAsyncThunk(
  "project/updateProject",
  async (title, { rejectWithValue }) => {
    try {
      const data = await projectAPI.updateProjects(
        title.values,
        title.projectId,
        title.acce,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const assignUserProject = createAsyncThunk(
  "project/assignUserProject",
  async (title, { rejectWithValue, dispatch }) => {
    try {
      const data = await projectAPI.assignUserProject(
        title.values,
        title.acces,
      );
      dispatch(getProjectDetails({taskId : title.values.projectId, acce : title.acces}))
      dispatch(getAllProject())
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const removeUserz = createAsyncThunk(
  "project/removeUseroject",
  async (title, { rejectWithValue,dispatch }) => {
    try {
      const data = await projectAPI.removeUserProject(
        title.values,
        title.acces,
      );
      dispatch(getProjectDetails({taskId : title.values.projectId, acce : title.acces}))
      dispatch(getAllProject())
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const projectSlices = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProject.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(getAllProject.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(ProjectCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ProjectCategory.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(ProjectCategory.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });

    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.listuser = payload;
      state.isLoading = false;
    });

    builder.addCase(getProjectDetail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProjectDetail.fulfilled, (state, { payload }) => {
      state.update = payload;
      state.isLoading = false;
    });
    builder.addCase(getProjectDetail.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
  },
});

export default projectSlices.reducer;
