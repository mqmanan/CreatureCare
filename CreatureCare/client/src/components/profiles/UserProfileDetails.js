import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card } from "reactstrap";
import { getUserProfileDetails } from "../../modules/userProfileManager";


const UserProfileDetails = () => {
    const [profile, setProfile] = useState();
    const { id } = useParams();

    useEffect(() => {
        getUserProfileDetails(id).then(setProfile);
    }, []);

    if (!profile.imageLocation) {
        profile.imageLocation = "https://robohash.org/numquamutut.png?size=150x150&set=set1";
    }

    return (
        <Card>

            <div className="container">
                <img className="image" src={profile?.imageLocation} />
                <div>User Name: {profile?.fullName} </div>
                <div>Display Name: {profile?.displayName}</div>
                <div>{profile?.userType.name}</div>
                <div>Email: {profile?.email}</div>
                <div>User Joined On: {profile?.createDateTime}</div>
            </div>

        </Card>
    );
}

export default UserProfileDetails;