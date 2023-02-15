using System.Collections.Generic;
using CreatureCare.Models;
using CreatureCare.Utils;

namespace CreatureCare.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void Add(UserProfile userProfile);
        UserProfile GetUserByIdWithUserType(int id);
        List<UserProfile> GetAllAdmin();
        List<UserProfile> GetAll();
    }
}
