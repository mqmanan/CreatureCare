using CreatureCare.Models;
using System.Collections.Generic;

namespace CreatureCare.Repositories
{
    public interface ICreatureRepository
    {
        List<Creature> GetAll();
        void Add(Creature creature);
        void Update(Creature creature);
        Creature GetById(int id);
        Creature GetOneCreature(int id);
        void Deactivate(int id);
    }
}
