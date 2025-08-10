package khanhlandev.bookstore_backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class DashboardDTO {
    private Double totalRevenue;
    private Long activeUsers;
    private Double monthlyRevenueGrowth;
    private Double averageRevenuePerUser;
    private List<MonthlyRevenueDTO> monthlyRevenueChart;
    private List<TopUserRevenueDTO> topUserRevenue;
    private List<GenreInsightDTO> genrePopularity;
}
