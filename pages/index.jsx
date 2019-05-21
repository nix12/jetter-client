import React, {Component} from "react";
import Link from 'next/link'
import { connect } from "react-redux";

class Page extends Component {
    
  render() {
    return (
      <div>
        <Link href='/auth'>
          <a>Auth</a>
        </Link>

        <Link href='user/new'>
          <a>Sign Up</a>
        </Link>

        <Link href='user/update'>
          <a>Update Password</a>
        </Link>
      </div>
    )
  }
}

export default connect(null, null)(Page);