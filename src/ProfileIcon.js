import React, { Component } from 'react'
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
  } from 'reactstrap';

export default class ProfileIcon extends Component {
    constructor(props){
        super(props);
        this.state = {
            dropdownOpen: false
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }
  
    render() {
    const { direction, ...args } = this.props;
        
    return (
        <div>
        <div className="pa4 tc">
      <Dropdown isOpen={this.state.dropdownOpen} toggle ={this.toggle} direction={direction}>
        <DropdownToggle
            data-toggle="dropdown"
            tag="span"
            >
        <img src="http://tachyons.io/img/logo.jpg"
             className="br-100 ba h3 w3 dib" alt="avatar" />
        </DropdownToggle>
        <DropdownMenu className='b--transparent shadow-5' 
                    style={{marginTop: '20px', backgroundColor: 'rgba(255,255,255,0.5'}} {...args}>
          <DropdownItem>View Profile</DropdownItem>
          <DropdownItem>Sign Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
       </div>
        </div>
    )
  }
}
