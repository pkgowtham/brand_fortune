// import React, { ChangeEvent, FormEvent, useContext, useRef } from 'react'
// import { useStyle } from '../chatStyle'
// import Typography from '../../../libComp/typography/component'
// import Button from '../../../libComp/button/button'
// import SvgClose from '../../../../custom-icons/Close'
// import SvgImportant from '../../../../custom-icons/Important'
// import SvgAttachFile from '../../../../custom-icons/AttachFile'
// import SvgSend from '../../../../custom-icons/Send'
// import Input from '../../../libComp/input/input'
// import InputField from '../../../libComp/input/main'
// import FileUploader from '../../../components/file/fileInput'
// import GlobalContext from '../../../context/globalContext'
//  import { messages,sender } from '../chatData.js'
// // import { CombinedItem } from '../chatType.js'

// const ChatInput = () => {

// // const {dispatch, state} = useContext(GlobalContext)
// const classes = useStyle()
// const fileInputRef =  useRef<HTMLInputElement>(null)

// let state =
// const validate = {
//     maxFileSize: 6 * 1024 * 1024, 
//     allowedFormats: /.+\..+$/i,
//     maxFiles: 5, 
// }

// const combinedList = state.fileUrl.map((url, index) => ({
//     url,
//     name: state.addAttachment[index]?.name || '',
//     type: state.addAttachment[index]?.type || 'unknown',
//   }));


// // const handleAttachClick = () => {
// //     if (fileInputRef.current) {
// //       fileInputRef.current.click();
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //       dispatch({
// //         type: 'UPDATE_INPUT',
// //         field: name as keyof Omit<State, 'errors'>,
// //         value,
// //       });
// //   };

// //   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();

// //     dispatch({ type: 'SUBMIT_FORM' });
// //     dispatch({ type: 'RESET_FORM' });
// // };

// // const handleFileClose = (index: number) => {

// //     if (Array.isArray(state.fileUrl) && Array.isArray(state.addAttachment)) {
// //       const updatedFileUrls = state.fileUrl.filter((_, i) => i !== index);
// //       const updatedAttachments = state.addAttachment.filter((_, i) => i !== index);
  
// //       dispatch({
// //         type: 'UPDATE_INPUT',
// //         field: 'fileUrl',
// //         value: updatedFileUrls,
// //       });
  
// //       dispatch({
// //         type: 'UPDATE_INPUT',
// //         field: 'addAttachment',
// //         value: updatedAttachments,
// //       });
// //     } 
// //   };

  
//   return (
//     <div className={classes.chatInputCon}>
//       {/* (state.errors.addAttachment || state.addAttachment.length > 0) */}
//           {true && (
//         <div className={classes.chatAttachmentError}>
//           <div className={classes.errorCon}>
//             {true && (
//               <div className={classes.errorContent}>
//                 <SvgImportant className={classes.errorIconColor} />
//                 {/* <Typography variant="LS" className={classes.errorColor}>
//                   {state.errors.addAttachment}
//                 </Typography> */}
//               </div>
//             )}
//           </div>
//           <div className={classes.chatAttachment}>
//             {combinedList.map((item, index) => (
//               <div key={index} className={classes.chatAttachItem}>
//                 <div className={classes.imgPreview}>
//                   <img src={item.url} alt={item.name} className={classes.chatAttachImage} />
//                 </div>
//                 <div className={classes.chatAttachCon}>
//                   <Typography variant="LM" className={classes.chatName}>{item.name}</Typography>
//                   <Typography variant="LS" className={classes.chatDes}>{item.type}</Typography>
//                 </div>
//                 <div>
//                   <Button element="button" icon={<SvgClose />} onClick={() => handleFileClose(index)} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//         <div className={classes.chatInput}>
//             <div>
//                 <FileUploader validation={validate} ref={fileInputRef} className={classes.display}/>
//                 <Button element='button' large primary icon={<SvgAttachFile/>} onClick={handleAttachClick}/>
//             </div>
//             <InputField>
//              <Input placeholder='Type a Message' onChange={handleChange} name='chat' value={state.chat}/>
//             </InputField>
//             <div>
//                <Button element='button' large primary icon={<SvgSend/>} onClick={handleSubmit}/>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default ChatInput