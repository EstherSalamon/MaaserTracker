﻿namespace MaaserTracker.Data
{
    public class Maaser
    {
        public int Id { get; set; }
        public string Recipient { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
