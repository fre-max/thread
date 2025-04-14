interface Props  {
    accountId:string, 
    userId:string, 
    authId:string ,
    name:string, 
    userName:string, 
    imgUrl:string,
    bio :string       
};

const ProfileHeader = (
  {  accountId, userId, authId ,name, userName, imgUrl ,bio
}:Props) => {
  return (
    <div>

    </div>
  )
}

export default ProfileHeader