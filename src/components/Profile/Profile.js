import React from 'react';
import './Profile.css';

const Profile = ({ isProfileOpen, toggleModal, user }) => {
  return (
    <div className='profile-modal'>
         <article className="mv6 br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
            <main className="pa4 black-80 w-80">
            <img src="http://tachyons.io/img/logo.jpg"
                className="h3 w3 dib" alt="avatar" />
            <h1>{user.name}</h1>
            <h4>{`Images submitted: ${user.entries}`}</h4>
            <p>{`Member since: ${new Date(user.joined).toLocaleDateString()}`}</p>
            <hr className='light-purple' />
            <label className="mt-2 fw6" htmlFor="username">Name:</label>
                <input 
                className="br3 pa2 w-100" 
                placeholder={user.name}
                type="text" 
                name="username"  
                id="name"/>
            <label className="mt-2 fw6" htmlFor="age">Age:</label>
                <input 
                className="br3 pa2 w-100" 
                placeholder={user.age}
                type="text" 
                name="age"  
                id="name"/>
            <label className="mt-2 fw6" htmlFor="username">Pet:</label>
                <input 
                className="br3 pa2 w-100" 
                placeholder={user.pet}
                type="text" 
                name="userpet"  
                id="pet"/>
            <div className='mt4' style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <button className='b pa2 grow pointer white w-40 bg-light-purple b--black-20'>
                    Save
                </button>
                <button className='b pa2 grow pointer light-purple w-40 bg-transparent b--light-purple'
                        onClick={toggleModal}>
                    Cancel
                </button>
            </div>
            </main>
            <div className='modal-close pa4 h1 pointer' onClick={toggleModal}>&times;</div>
		</article>
    </div>
    )
}

export default Profile;