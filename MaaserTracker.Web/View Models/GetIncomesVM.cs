using MaaserTracker.Data;

namespace MaaserTracker.Web.View_Models
{
    public class GetIncomesVM
    {
        public List<Income> Incomes { get; set; }
        public List<Source> GroupedIncomes { get; set; }
    }
}
