using MaaserTracker.Data;
using MaaserTracker.Web.View_Models;
using Microsoft.AspNetCore.Connections.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MaaserTracker.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoneysController : ControllerBase
    {
        private readonly string _connection;

        public MoneysController(IConfiguration config)
        {
            _connection = config.GetConnectionString("ConStr");
        }

        [HttpGet("get-s")]
        public List<Source> GetSources()
        {
            MaaserRepository repo = new MaaserRepository(_connection);
            return repo.GetAllSources();
        }

        [HttpGet("get-i")]
        public GetIncomesVM GetIncomes()
        {
            MaaserRepository repo = new MaaserRepository(_connection);
            GetIncomesVM vm = new GetIncomesVM
            {
                Incomes = repo.GetAllIncomes(),
                GroupedIncomes = repo.GetAllSources()
            };
            return vm;
        }

        [HttpGet("get-m")]
        public List<Maaser> GetMaasers()
        {
            MaaserRepository repo = new MaaserRepository(_connection);
            return repo.GetAllMaasers();
        }

        [HttpPost("add-s")]
        public void AddSource(SourceVM vm)
        {
            MaaserRepository repo = new MaaserRepository(_connection);
            repo.AddSource(vm.Source);
        }

        [HttpPost("add-i")]
        public void AddIncome(IncomeVM vm)
        {
            MaaserRepository repo = new MaaserRepository(_connection);
            repo.AddIncome(vm.Income);
        }

        [HttpPost("add-m")]
        public void AddMaaser(MaaserVM vm)
        {
            MaaserRepository repo = new MaaserRepository(_connection);
            repo.AddMaaser(vm.Maaser);
        }

        [HttpPost("update-s")]
        public void UpdateSource(SourceVM vm)
        {
            MaaserRepository repo = new MaaserRepository(_connection);
            repo.UpdateSource(vm.Source);
        }

        [HttpPost("delete-s")]
        public void DeleteSource(SourceVM vm)
        {
            MaaserRepository repo = new MaaserRepository(_connection);
            repo.DeleteSource(vm.Source);
        }

        [HttpGet("stats")]
        public GetStatsVM GetStats()
        {
            MaaserRepository repo = new MaaserRepository(_connection);
            GetStatsVM vm = new GetStatsVM
            {
                TotalIncome = repo.TotalIncome(),
                TotalMaaser = repo.TotalMaaser()
            };
            return vm;
        }
    }
}
