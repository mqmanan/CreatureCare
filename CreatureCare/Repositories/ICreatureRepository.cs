using CreatureCare.Models;
using System.Collections.Generic;

namespace CreatureCare.Repositories
{
    public interface ICreatureRepository
    {
        List<Creature> GetAll();
    }
}
