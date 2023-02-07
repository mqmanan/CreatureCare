using CreatureCare.Models;

namespace CreatureCare.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void Add(UserProfile userProfile);
    }
}
