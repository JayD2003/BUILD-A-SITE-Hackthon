export const useGetUserInfo = () => {
    // to get the info from the local storage
    const {name,
         profilePhoto, 
         gmail,
         userID, 
         isAuth} = JSON.parse(localStorage.getItem("auth")) || {};
    //  {} used flower bracket for the case where there is no user

    // returning the required info
    return {name, profilePhoto, gmail, userID, isAuth};
}