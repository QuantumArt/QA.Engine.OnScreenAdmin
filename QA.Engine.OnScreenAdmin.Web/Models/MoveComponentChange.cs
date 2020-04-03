namespace QA.DotNetCore.OnScreenAdmin.Web.Models
{
    public class MoveComponentChange
    {
        public int AbstractItemId { get; set; }
        public int? NewParentId { get; set; }
        public string NewZoneName { get; set; }
        public int? NewOrder { get; set; }
    }
}
