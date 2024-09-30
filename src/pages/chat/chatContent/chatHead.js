import React from 'react'
import { useStyle } from '../chatStyle'
import Avatar from '../../../libComp/avatar/avatar'
import Button from '../../../libComp/button/button'
import SvgSearch from '../../../../custom-icons/Search'
import SvgMoreVert from '../../../../custom-icons/MoreVert'
import SvgVideocam from '../../../../custom-icons/Videocam'
import SvgCall from '../../../../custom-icons/Call'
import Typography from '../../../libComp/typography/component'

const ChatHead = () => {

const classes = useStyle()

  return (
    <div className={classes.chatContentNav}>
    <div className={classes.chatNavAvaCon}>
     <Avatar text='A' size='medium' border/>
     <div className={classes.chatNavCon}>
        <Typography variant='LM' className={classes.NavNameCol}>Praveen</Typography>
        <Typography variant='LS' className={classes.NavDesCol}>Online</Typography>         
     </div>
    </div>
    <div className={classes.chatNavIcons}>
        <div>
            <Button element='button' icon={<SvgSearch className={classes.navIconCol}/>}/>
        </div>
        <div>
            <Button element='button' icon={<SvgVideocam/>}/>
        </div>
        <div>
            <Button element='button' icon={<SvgCall/>}/>
        </div>
        <div>
            <Button element='button' icon={<SvgMoreVert/>}/>
        </div>
    </div>
 </div>
  )
}

export default ChatHead