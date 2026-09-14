namespace w2.Domain.Models
{
    public class Score
    {
        public int ScoreId { get; set; }
        public int EnrollmentId { get; set; }
        public DateTime ExamDate { get; set; }

        private double _value;

        public double Value 
        { 
            get => _value; 
        }

        public void SetGrade(double value)
        {
            if (value < 0 || value > 10)
            {
                throw new ArgumentException("Điểm số bắt buộc phải nằm trong khoảng từ 0 đến 10!");
            }
            _value = value;
        }
    }
}
