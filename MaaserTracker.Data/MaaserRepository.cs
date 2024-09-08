using Microsoft.EntityFrameworkCore;

namespace MaaserTracker.Data
{
    public class MaaserRepository
    {
        private readonly string _connection;

        public MaaserRepository(string connection)
        {
            _connection = connection;
        }

        public List<Source> GetAllSources()
        {
            using MaaserDataContext context = new MaaserDataContext(_connection);
            return context.Sources.Include(s => s.Incomes).ToList();
        }

        public List<Income> GetAllIncomes()
        {
            using MaaserDataContext context = new MaaserDataContext(_connection);
            return context.Incomes.ToList();
        }

        public List<Maaser> GetAllMaasers()
        {
            using MaaserDataContext context = new MaaserDataContext(_connection);
            return context.Maasers.ToList();
        }

        public void AddSource(Source s)
        {
            using MaaserDataContext context = new MaaserDataContext(_connection);
            context.Sources.Add(s);
            context.SaveChanges();
        }

        public void AddIncome(Income i)
        {
            using MaaserDataContext context = new MaaserDataContext(_connection);
            context.Incomes.Add(i);
            context.SaveChanges();
        }

        public void AddMaaser(Maaser m)
        {
            using MaaserDataContext context = new MaaserDataContext(_connection);
            context.Maasers.Add(m);
            context.SaveChanges();
        }

        public void UpdateSource(Source s)
        {
            using MaaserDataContext context = new MaaserDataContext(_connection);
            context.Update(s);
            context.SaveChanges();
        }

        public void DeleteSource(Source s)
        {
            using MaaserDataContext context = new MaaserDataContext(_connection);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Incomes WHERE SourceId = {s.Id} DELETE FROM Sources WHERE Id = {s.Id}");
        }

        public decimal TotalIncome()
        {
            using MaaserDataContext context = new MaaserDataContext(_connection);
            return context.Incomes.Sum(i => i.Amount);
        }

        public decimal TotalMaaser()
        {
            using MaaserDataContext context = new MaaserDataContext(_connection);
            return context.Maasers.Sum(m => m.Amount);
        }
    }
}
