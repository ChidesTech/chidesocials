export default function ProfileInfo({user}){

    
    return  <div className="profile-right-top">
    <div className="profile-image">
        <img className="cover-image" src={user.coverPicture && "/images/profile.png"} alt="" />
        <img className="display-image" src={user.profilePicture || "/images/profile.png"} alt="" />
    </div>

    <div className="profile-info">
        <h4 className="profile-info-name">{user.username}</h4>
        <span className="profile-info-description">Software Engineer</span>
    </div>
</div>
}