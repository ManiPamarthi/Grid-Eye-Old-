import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette:{
    primary:{
      main:"#102040",
      light:"#c2ddfb6b"
    },
    secondary:{
      main:"#8a8c94",
      light:"#e3e6f0",
    },
    text:{
      main:"#1b1b28",
    },
    danger:{
      main:"#fd5969",
    },
    warning:{
      main:'#f7bb00',
    },
    light:{
      main:"#fff",
    }
  },
  typography:{
    h6:{
      fontSize: 14.4,
    },
    h5:{
      fontSize:17.3,
      fontWeight:500,
    },
    subtitle2:{
      fontSize:12,
    },
    body2:{
      fontSize:12,
    },
  },
})
