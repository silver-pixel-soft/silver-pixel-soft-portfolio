import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  chips?: string[];
}

export interface AIState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export const INITIAL_MESSAGES: Message[] = [
  {
    id: "init-1",
    sender: "assistant",
    text: "👋 **Hello! I'm Silver AI**, your interactive assistant for Silver Pixel Soft.\n\nI can help you explore our **featured projects**, **tech stack**, **client services**, or **pricing**. What would you like to know?",
    timestamp: "Just now",
    chips: [
      "Show featured projects",
      "Tell me about Lio SaaS",
      "What services do you provide?",
      "What is your tech stack?",
      "How can I contact you?",
    ],
  },
];

const initialState: AIState = {
  messages: INITIAL_MESSAGES,
  isLoading: false,
  error: null,
};

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export const sendAIMessage = createAsyncThunk(
  "ai/sendAIMessage",
  async (prompt: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/ai/ai-assistant`,
        { prompt },
        { withCredentials: true }
      );
      // Backend ApiResponse structure: { statusCode: 200, data: { result: string, chips: string[] }, message: string, success: true }
      return response.data?.data as { result: string; chips?: string[] };
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to reach Silver AI assistant.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    addUserMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        id: `user-${Date.now()}`,
        sender: "user",
        text: action.payload,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
    },
    clearMessages: (state) => {
      state.messages = INITIAL_MESSAGES;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendAIMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendAIMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push({
          id: `ai-${Date.now()}`,
          sender: "assistant",
          text:
            action.payload?.result ||
            "Thank you for contacting Silver Pixel Soft. How else can I help?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          chips: action.payload?.chips,
        });
      })
      .addCase(sendAIMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Failed to generate AI response";
        state.messages.push({
          id: `ai-err-${Date.now()}`,
          sender: "assistant",
          text:
            "⚠️ **Connection Notice**: I'm having trouble connecting to the Silver AI server. Please make sure the backend is running or reach out via our contact form.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          chips: ["Scroll to Contact Form", "What services do you provide?"],
        });
      });
  },
});

export const { addUserMessage, clearMessages } = aiSlice.actions;
export default aiSlice.reducer;
