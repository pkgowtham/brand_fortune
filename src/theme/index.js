import { createTheme } from '@material-ui/core';



const theme = createTheme({
    palette:{
      type:'light',
      primary:{
        main:'#48a948', 
        contrastText:'#fafafa',     
      },
      text:{
        secondary:'#858585'
      },      
    },
    typography:{    
      h1:{
        fontSize: 'calc(80px + (96 - 80) * ((100vw - 350px) / (2000 - 350)))',
      },
      h2:{
        fontSize: 'calc(50px + (60 - 50) * ((100vw - 350px) / (2000 - 350)))',
      },
      h3:{
        fontSize: 'calc(35px + (48 - 35) * ((100vw - 350px) / (2000 - 350)))',
      },
      h4:{
        fontSize: 'calc(26px + (34 - 26) * ((100vw - 350px) / (2000 - 350)))',
      },
      h5:{
        fontSize: 'calc(20px + (24 - 20) * ((100vw - 350px) / (2000 - 350)))',
      },
      h6:{
        fontSize: 'calc(16px + (20 - 16) * ((100vw - 350px) / (2000 - 350)))',
      },
      subtitle1:{
        fontSize: 'calc(14px + (16 - 14) * ((100vw - 350px) / (2000 - 350)))',
      },
      subtitle2:{
        fontSize: 'calc(12px + (14 - 12) * ((100vw - 350px) / (2000 - 350)))',
      },
      body1:{
        fontSize: 'calc(14px + (16 - 14) * ((100vw - 350px) / (2000 - 350)))',
      },
      body2:{
        fontSize: 'calc(12px + (14 - 12) * ((100vw - 350px) / (2000 - 350)))',
      },
      button:{
        fontSize: 'calc(12px + (14 - 12) * ((100vw - 350px) / (2000 - 350)))',
      },
      caption:{
        fontSize: 'calc(10px + (12 - 10) * ((100vw - 350px) / (2000 - 350)))',
      },
      overline:{
        fontSize: 'calc(8.5px + (10 - 8.5 ) (*(100v w -35px0 ) /(200 0 -350)))',
      },
    }
  })

  export default theme;