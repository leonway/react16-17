import React from 'react'
import { ThemeContext , UserContext} from '../context'

function UserPage(props) {
  const ctx = React.useContext(ThemeContext)
  const user = React.useContext(UserContext)
  console.log(ctx);
  return (
    <div>
      <h3 className={ctx.themeColor}>
        UserPage
      </h3>
      <p>
        姓名：{user.name}
      </p>
    </div>
  )
}


export default UserPage

