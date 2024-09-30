import { makeStyles } from "@material-ui/core"
const colors = {
  "colorLightNeutralSurfaceLighter": "#ffffff",
  "colorLightNeutralSurfaceLight": "#f5f5f5",
  "colorLightNeutralSurfaceMedium": "#d9d9d9",
  "colorLightNeutralSurfaceDisabled": "#f0f0f0",
  "colorLightNeutralBorderLight": "#d9d9d9",
  "colorLightNeutralBorderMedium": "#8c8c8c",
  "colorLightNeutralBorderDisabled": "#8c8c8c",
  "colorLightNeutralOnSurfaceTitle": "#262626",
  "colorLightNeutralOnSurfaceMedium": "#595959",
  "colorLightNeutralOnSurfaceDark": "#8c8c8c",
  "colorLightBrandSurfaceLighter": "#e6f2ff",
  "colorLightBrandSurfaceLight": "#8ac2ff",
  "colorLightBrandSurfaceMedium": "#3395ff",
  "colorLightBrandSurfaceDarker": "#00448c",
  "colorLightBrandBorderLight": "#b0d6ff",
  "colorLightBrandBorderMedium": "#3395ff",
  "colorLightBrandBorderDark": "#00346b",
  "colorLightBrandOnSurfaceDefault": "#3395ff",
  "colorLightInfoSurfaceLighter": "#efe6fd",
  "colorLightInfoSurfaceLight": "#b78af7",
  "colorLightInfoSurfaceMedium": "#8133f1",
  "colorLightInfoSurfaceDark": "#4600a9",
  "colorLightInfoBorderLight": "#ceb0fa",
  "colorLightInfoBorderMedium": "#8133f1",
  "colorLightInfoBorderDark": "#360083",
  "colorLightInfoOnSurfaceMedium": "#8133f1",
  "colorLightPositiveSurfaceLighter": "#eaf6ec",
  "colorLightPositiveSurfaceLight": "#9cd7a9",
  "colorLightPositiveSurfaceMedium": "#53b96a",
  "colorLightPositiveSurfaceDark": "#1c7731",
  "colorLightPositiveBorderLight": "#bce4c5",
  "colorLightPositiveBorderMedium": "#53b96a",
  "colorLightPositiveBorderDark": "#165c26",
  "colorLightPositiveOnSurfaceMedium": "#53b96a",
  "colorLightNegativeSurfaceLighter": "#fcebec",
  "colorLightNegativeSurfaceLight": "#efa2a9",
  "colorLightNegativeSurfaceMedium": "#e35d6a",
  "colorLightNegativeSurfaceDark": "#9c2631",
  "colorLightNegativeBorderLight": "#f4c0c5",
  "colorLightNegativeBorderMedium": "#e35d6a",
  "colorLightNegativeBorderDark": "#791d26",
  "colorLightNegativeOnSurfaceMedium": "#e35d6a",
  "colorLightWarningSurfaceLighter": "#faf5e6",
  "colorLightWarningSurfaceLight": "#ffe28d",
  "colorLightWarningSurfaceMedium": "#ffcd39",
  "colorLightWarningSurfaceDark": "#b58905",
  "colorLightWarningBorderLight": "#ffecb2",
  "colorLightWarningBorderMedium": "#ffcd39",
  "colorLightWarningBorderDark": "#8c6a04",
  "colorLightWarningOnSurfaceMedium": "#ffcd39",
  "colorLightNeutralOnSurfaceCaption": "#bfbfbf",
  "colorLightNeutralOnSurfaceNegative": "#ffffff",
  "colorLightNeutralOnSurfaceDisabled": "#bfbfbf",
  "colorDarkNeutralSurfaceLighter": "#bfbfbf",
  "colorDarkNeutralSurfaceLight": "#595959",
  "colorDarkNeutralSurfaceMedium": "#262626",
  "colorDarkNeutralSurfaceDisabled": "#595959",
  "colorDarkNeutralBorderLight": "#8c8c8c",
  "colorDarkNeutralBorderMedium": "#454545",
  "colorDarkNeutralBorderDisabled": "#d9d9d9",
  "colorDarkNeutralOnSurfaceTitle": "#ffffff",
  "colorDarkNeutralOnSurfaceMedium": "#f5f5f5",
  "colorDarkNeutralOnSurfaceDark": "#d9d9d9",
  "colorDarkNeutralOnSurfaceCaption": "#bfbfbf",
  "colorDarkNeutralOnSurfaceNegative": "#000000",
  "colorDarkNeutralOnSurfaceDisabled": "#fcfcfc",
  "colorDarkBrandSurfaceLighter": "#b0d6ff",
  "colorDarkBrandSurfaceLight": "#54a7ff",
  "colorDarkBrandSurfaceMedium": "#00448c",
  "colorDarkBrandSurfaceDark": "#00346b",
  "colorDarkBrandBorderLight": "#e6f2ff",
  "colorDarkBrandBorderMedium": "#8ac2ff",
  "colorDarkBrandBorderDark": "#0070e8",
  "colorDarkBrandOnSurfaceDefault": "#3395ff",
  "colorDarkInfoSurfaceLighter": "#9654f4",
  "colorDarkInfoSurfaceLight": "#6200ee",
  "colorDarkInfoSurfaceMedium": "#4600a9",
  "colorDarkInfoSurfaceDark": "#290064",
  "colorDarkInfoBorderLight": "#ceb0fa",
  "colorDarkInfoBorderMedium": "#9654f4",
  "colorDarkInfoBorderDark": "#5900d9",
  "colorDarkInfoOnSurfaceMedium": "#8133f1",
  "colorDarkPositiveSurfaceLighter": "#6fc482",
  "colorDarkPositiveSurfaceLight": "#28a745",
  "colorDarkPositiveSurfaceMedium": "#1c7731",
  "colorDarkPositiveSurfaceDark": "#11461d",
  "colorDarkPositiveBorderLight": "#bce4c5",
  "colorDarkPositiveBorderMedium": "#6fc482",
  "colorDarkPositiveBorderDark": "#24983f",
  "colorDarkPositiveOnSurfaceMedium": "#53b96a",
  "colorDarkNegativeSurfaceLighter": "#e87882",
  "colorDarkNegativeSurfaceLight": "#dc3545",
  "colorDarkNegativeSurfaceMedium": "#9c2631",
  "colorDarkNegativeSurfaceDark": "#5c161d",
  "colorDarkNegativeBorderLight": "#efa2a9",
  "colorDarkNegativeBorderMedium": "#e35d6a",
  "colorDarkNegativeBorderDark": "#c8303f",
  "colorDarkNegativeOnSurfaceMedium": "#e35d6a",
  "colorDarkWarningSurfaceLighter": "#ffd559",
  "colorDarkWarningSurfaceLight": "#ffc107",
  "colorDarkWarningSurfaceMedium": "#b58905",
  "colorDarkWarningSurfaceDark": "#6b5103",
  "colorDarkWarningBorderLight": "#ffecb2",
  "colorDarkWarningBorderMedium": "#ffd559",
  "colorDarkWarningBorderDark": "#e8b006",
  "colorDarkWarningOnSurfaceMedium": "#ffcd39",
  "colorLightNeutralBorderDark": "#454545",
  "colorLightBrandSurfaceDark": "#0070e8"
}
export const theme = {
  light: {
    neutral: {
      surface: {
        lighter: colors.colorLightNeutralSurfaceLighter,
        light: colors.colorLightNeutralSurfaceLight,
        medium: colors.colorLightNeutralSurfaceMedium,
        disabled: colors.colorLightNeutralSurfaceDisabled,
      },
      border: {
        light: colors.colorLightNeutralBorderLight,
        medium: colors.colorLightNeutralBorderMedium,
        disabled: colors.colorLightNeutralBorderDisabled,
      },
      onSurface: {
        title: colors.colorLightNeutralOnSurfaceTitle,
        medium: colors.colorLightNeutralOnSurfaceMedium,
        dark: colors.colorLightNeutralOnSurfaceDark,
        caption: colors.colorLightNeutralOnSurfaceCaption,
        negative: colors.colorLightNeutralOnSurfaceNegative,
        disabled: colors.colorLightNeutralOnSurfaceDisabled,
      },
    },
    brand: {
      surface: {
        lighter: colors.colorLightBrandSurfaceLighter,
        light: colors.colorLightBrandSurfaceLight,
        medium: colors.colorLightBrandSurfaceMedium,
        dark: colors.colorLightBrandSurfaceDark,
        darker: colors.colorLightBrandSurfaceDarker
      },
      border: {
        light: colors.colorLightBrandBorderLight,
        medium: colors.colorLightBrandBorderMedium,
        dark: colors.colorLightBrandBorderDark,
      },
      onSurface: {
        default: colors.colorLightBrandOnSurfaceDefault,
      },
    },
    info: {
      surface: {
        lighter: colors.colorLightInfoSurfaceLighter,
        light: colors.colorLightInfoSurfaceLight,
        medium: colors.colorLightInfoSurfaceMedium,
        dark: colors.colorLightInfoSurfaceDark,
      },
      border: {
        light: colors.colorLightInfoBorderLight,
        medium: colors.colorLightInfoBorderMedium,
        dark: colors.colorLightInfoBorderDark,
      },
      onSurface: {
        medium: colors.colorLightInfoOnSurfaceMedium,
      },
    },
    positive: {
      surface: {
        lighter: colors.colorLightPositiveSurfaceLighter,
        light: colors.colorLightPositiveSurfaceLight,
        medium: colors.colorLightPositiveSurfaceMedium,
        dark: colors.colorLightPositiveSurfaceDark,
      },
      border: {
        light: colors.colorLightPositiveBorderLight,
        medium: colors.colorLightPositiveBorderMedium,
        dark: colors.colorLightPositiveBorderDark,
      },
      onSurface: {
        medium: colors.colorLightPositiveOnSurfaceMedium,
      },
    },
    negative: {
      surface: {
        lighter: colors.colorLightNegativeSurfaceLighter,
        light: colors.colorLightNegativeSurfaceLight,
        medium: colors.colorLightNegativeSurfaceMedium,
        dark: colors.colorLightNegativeSurfaceDark,
      },
      border: {
        light: colors.colorLightNegativeBorderLight,
        medium: colors.colorLightNegativeBorderMedium,
        dark: colors.colorLightNegativeBorderDark,
      },
      onSurface: {
        medium: colors.colorLightNegativeOnSurfaceMedium,
      },
    },
    warning: {
      surface: {
        lighter: colors.colorLightWarningSurfaceLighter,
        light: colors.colorLightWarningSurfaceLight,
        medium: colors.colorLightWarningSurfaceMedium,
        dark: colors.colorLightWarningSurfaceDark,
      },
      border: {
        light: colors.colorLightWarningBorderLight,
        medium: colors.colorLightWarningBorderMedium,
        dark: colors.colorLightWarningBorderDark,
      },
      onSurface: {
        medium: colors.colorLightWarningOnSurfaceMedium,
      },
    },
  },
  dark: {
    neutral: {
      surface: {
        lighter: colors.colorDarkNeutralSurfaceLighter,
        light: colors.colorDarkNeutralSurfaceLight,
        medium: colors.colorDarkNeutralSurfaceMedium,
        disabled: colors.colorDarkNeutralSurfaceDisabled,
      },
      border: {
        light: colors.colorDarkNeutralBorderLight,
        medium: colors.colorDarkNeutralBorderMedium,
        dark: colors.colorDarkNeutralBorderDark,
        disabled: colors.colorDarkNeutralBorderDisabled,
      },
      onSurface: {
        title: colors.colorDarkNeutralOnSurfaceTitle,
        medium: colors.colorDarkNeutralOnSurfaceMedium,
        dark: colors.colorDarkNeutralOnSurfaceDark,
        caption: colors.colorDarkNeutralOnSurfaceCaption,
        negative: colors.colorDarkNeutralOnSurfaceNegative,
        disabled: colors.colorDarkNeutralOnSurfaceDisabled,
      },
    },
    brand: {
      surface: {
        lighter: colors.colorDarkBrandSurfaceLighter,
        light: colors.colorDarkBrandSurfaceLight,
        medium: colors.colorDarkBrandSurfaceMedium,
        dark: colors.colorDarkBrandSurfaceDark,
      },
      border: {
        light: colors.colorDarkBrandBorderLight,
        medium: colors.colorDarkBrandBorderMedium,
        dark: colors.colorDarkBrandBorderDark,
      },
      onSurface: {
        default: colors.colorDarkBrandOnSurfaceDefault,
      },
    },
    info: {
      surface: {
        lighter: colors.colorDarkInfoSurfaceLighter,
        light: colors.colorDarkInfoSurfaceLight,
        medium: colors.colorDarkInfoSurfaceMedium,
        dark: colors.colorDarkInfoSurfaceDark,
      },
      border: {
        light: colors.colorDarkInfoBorderLight,
        medium: colors.colorDarkInfoBorderMedium,
        dark: colors.colorDarkInfoBorderDark,
      },
      onSurface: {
        medium: colors.colorDarkInfoOnSurfaceMedium,
      },
    },
    positive: {
      surface: {
        lighter: colors.colorDarkPositiveSurfaceLighter,
        light: colors.colorDarkPositiveSurfaceLight,
        medium: colors.colorDarkPositiveSurfaceMedium,
        dark: colors.colorDarkPositiveSurfaceDark,
      },
      border: {
        light: colors.colorDarkPositiveBorderLight,
        medium: colors.colorDarkPositiveBorderMedium,
        dark: colors.colorDarkPositiveBorderDark,
      },
      onSurface: {
        medium: colors.colorDarkPositiveOnSurfaceMedium,
      },
    },
    negative: {
      surface: {
        lighter: colors.colorDarkNegativeSurfaceLighter,
        light: colors.colorDarkNegativeSurfaceLight,
        medium: colors.colorDarkNegativeSurfaceMedium,
        dark: colors.colorDarkNegativeSurfaceDark,
      },
      border: {
        light: colors.colorDarkNegativeBorderLight,
        medium: colors.colorDarkNegativeBorderMedium,
        dark: colors.colorDarkNegativeBorderDark,
      },
      onSurface: {
        medium: colors.colorDarkNegativeOnSurfaceMedium,
      },
    },
    warning: {
      surface: {
        lighter: colors.colorDarkWarningSurfaceLighter,
        light: colors.colorDarkWarningSurfaceLight,
        medium: colors.colorDarkWarningSurfaceMedium,
        dark: colors.colorDarkWarningSurfaceDark,
      },
      border: {
        light: colors.colorDarkWarningBorderLight,
        medium: colors.colorDarkWarningBorderMedium,
        dark: colors.colorDarkWarningBorderDark,
      },
      onSurface: {
        medium: colors.colorDarkWarningOnSurfaceMedium,
      },
    },
  },
  borderRadius: {
    "b0": 0,
    "b50": 2,
    "b100": 4,
    "b150": 6,
    "b200": 8,
    "b300": 12,
    "b400": 16,
    "b500": 20,
    "b700": 28,
    "b900": 36,
    "b1200": 48,
    "b2500": 100
  },
  spacing: {
    "s0": '0px',
    "s100": '4px',
    "s200": '8px',
    "s300": '12px',
    "s400": '16px',
    "s500": '20px',
    "s600": '24px',
    "s800": '32px',
    "s1000": '40px',
    "s1200": '48px',
    "s1600": '62px',
    "s2000": '80px'
  },
  elevation: {
    's': '0px 0px 6px 0px rgba(0, 0, 0, 0.25)',
    'm': '0px 0px 6px 2px rgba(0, 0, 0, 0.25)',
    'l': '0px 0px 8px 4px rgba(0, 0, 0, 0.25)',
  }
};


export const useStyle = makeStyles((theme=theme) => ({

  chatMainCon: {
    Width: '100%',
    display: 'flex',
  },

  chatContentMainContainer: {
    width: '100%',
    // height: 'calc(100vh - 119px)',
    // overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
  },

  // chatContentNav: {
  //   width: '100%',
  //   padding: theme.spacing.s300,
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   // boxShadow: theme.elevation.m,
  // },

  // chatNavAvaCon: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   gap: theme.spacing.s300
  // },

  // chatNavCon: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  // },

  NavNameCol: {
    // color: theme.light.neutral.onSurface.title
  },

  NavDesCol: {
    // color: theme.light.neutral.onSurface.dark
  },

  // chatNavIcons: {
  //   display: 'flex',
  //   alignItems: 'center',
  // },

  // navIconCol: {
  //   '& path': {
  //     // fill: theme.light.neutral.onSurface.dark
  //   }
  // },

  // chatInputCon: {
  //   width: '100%',
  //   padding: theme.spacing.s400,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   boxShadow: theme.elevation.m,
  // },

  // chatAttachmentError: {
  //   width: '100%',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   gap: theme.spacing.s300,
  //   paddingBottom: theme.spacing.s300
  // },

  // errorCon: {
  //   width: '100%',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'flex-start',
  // },

  // errorContent: {
  //   backgroundColor: theme.light.negative.surface.lighter,
  //   padding: `4px 8px`,
  //   borderRadius: theme.borderRadius.b200,
  //   display: 'flex',
  //   alignItems: 'center',
  //   gap: theme.spacing.s200,
  // },

  // errorIconColor: {
  //   '& path': {
  //     fill: theme.light.negative.onSurface.medium
  //   }
  // },

  // errorColor:{
  //     color:theme.light.negative.onSurface.medium
  // },

  // chatAttachment: {
  //   width: '100%',
  //   display: 'flex',
  //   alignItems: 'center',
  //   flexWrap: 'wrap',
  //   gap: theme.spacing.s400
  // },

  // chatAttachItem: {
  //   flex: '1 1 200px',
  //   maxWidth: '240px',
  //   padding: theme.spacing.s200,
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   border: `1px solid ${theme.light.neutral.border.light}`,
  //   borderRadius: theme.borderRadius.b100
  // },

  // imgPreview: {
  //   width: '24px',
  //   height: '24px',
  //   borderRadius: theme.borderRadius.b100
  // },

  // chatAttachImage: {
  //   width: '100%',
  //   height: '100%',
  //   objectFit: 'cover',
  // },

  // chatAttachCon: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   width: '60%',
  // },

  // chatInput: {
  //   width: '100%',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   paddingTop: theme.spacing.s400,
  //   gap: theme.spacing.s300,
  // },

  // chatMainContentCon: {
  //   width: '100%',
  //   height: '100%',
  //   overflowY: 'auto',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   gap: theme.spacing.s300,
  //   padding: `4px 20px`,
  //   '&::-webkit-scrollbar': {
  //     width: '5px',
  //   },
  //   '&::-webkit-scrollbar-track': {
  //     background: '#f4f4f4',
  //   },
  //   '&::-webkit-scrollbar-thumb': {
  //     background: '#888',
  //     borderRadius: '6px',
  //   },
  //   '&::-webkit-scrollbar-thumb:hover': {
  //     background: '#555',
  //   },
  // },

  // chatMessageCardCon: {
  //   width: '100%',
  //   // display: 'flex',
  //   // alignItems: 'center',
  // },

  // chatMessageCard: {
  //   maxWidth: '60%',
  //   padding: theme.spacing.s200,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   gap: theme.spacing.s100,
  //   justifyContent: 'center',
  //   backgroundColor: theme.light.brand.surface.lighter,
  //   borderRadius: theme.borderRadius.b100
  // },

  // messageFromCurrentUser: {
  //   justifyContent: 'flex-end'
  // },

  // messageFromOtherUser: {
  //   justifyContent: 'flex-start',
  //   '& $chatMessageCard': {
  //     backgroundColor: theme.light.neutral.surface.light,
  //   }
  // },

  // chatMessTimeCon: {
  //   width: '100%',
  //   display: 'flex',
  //   justifyContent: 'flex-end',
  //   alignItems: 'center'
  // },

  // display: {
  //   display: 'none !important'
  // },

  // chatListMainCon: {
  //   minWidth: '25%',
  //   maxWidth: '26%',
  //   height: 'calc(100vh - 60px)',
  //   overflowY: 'auto',
  //   borderRight: `2px solid ${theme.light.neutral.border.light}`,
  //   display: 'flex',
  //   flexDirection: 'column',
  // },

  // chatListHeadCon: {
  //   width: '100%',
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   backgroundColor: theme.light.neutral.surface.light,
  //   padding: theme.spacing.s300,
  //   gap: theme.spacing.s300,
  // },

  // chatListHeadText: {
  //   display: 'flex',
  //   alignItems: 'center'
  // },

  // chatListHeadIcons: {
  //   display: 'flex',
  //   alignItems: 'center'
  // },

  // chatListItemMainCon: {
  //   width: '100%',
  //   height: '100vh',
  //   overflowY: 'auto',
  //   overflowX: 'hidden',
  //   '&::-webkit-scrollbar': {
  //     width: '5px',
  //   },
  //   '&::-webkit-scrollbar-track': {
  //     background: '#f4f4f4',
  //   },
  //   //   '&::-webkit-scrollbar-thumb': {
  //   //     background: '#888',
  //   //     borderRadius: '2px',
  //   //   },
  //   '&::-webkit-scrollbar-thumb:hover': {
  //     background: '#888',
  //   },
  // },

  // chatListItemCon: {
  //   padding: theme.spacing.s300,
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   gap: theme.spacing.s300,
  //   '&:hover': {
  //     backgroundColor: theme.light.neutral.surface.light
  //   },
  //   '&:active': {
  //     backgroundColor: theme.light.brand.surface.lighter
  //   },
  // },

  // chatListSelected: {
  //   backgroundColor: theme.light.neutral.surface.light
  // },

  // chatListItem: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   flexDirection: 'column',
  //   width: '60%'
  // },

  // chatName: {
  //   color: theme.light.neutral.onSurface.title,
  //   whiteSpace: 'nowrap',
  //   overflow: 'hidden',
  //   textOverflow: 'ellipsis',
  // },

  // chatDes: {
  //   color: theme.light.neutral.onSurface.medium,
  //   whiteSpace: 'nowrap',
  //   overflow: 'hidden',
  //   textOverflow: 'ellipsis',
  // },

  // chatListItemTime: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   flexDirection: 'column',
  // },

  // horizontalLine: {
  //   border: `1px solid ${theme.light.neutral.border.light}`
  // },

}))