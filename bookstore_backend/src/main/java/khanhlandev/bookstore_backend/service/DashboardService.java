package khanhlandev.bookstore_backend.service;

import khanhlandev.bookstore_backend.dao.CategoryRepository;
import khanhlandev.bookstore_backend.dao.OrderRepository;
import khanhlandev.bookstore_backend.dao.UserRepository;
import khanhlandev.bookstore_backend.dto.DashboardDTO;
import khanhlandev.bookstore_backend.dto.GenreInsightDTO;
import khanhlandev.bookstore_backend.dto.MonthlyRevenueDTO;
import khanhlandev.bookstore_backend.dto.TopUserRevenueDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private OrderRepository ordersRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository bookCategoryRepository;

    public DashboardDTO getDashboardData() {

        Double totalRevenue = ordersRepository.getTotalRevenue();
        if (totalRevenue == null) totalRevenue = 0.0;

        Long activeUsers = userRepository.countActiveUsers();
        if (activeUsers == null || activeUsers == 0) activeUsers = 1L;

        int currentMonth = 9;
        int currentYear = 2023;

        Double currentMonthRevenue = ordersRepository.getRevenueByMonth(currentMonth, currentYear);
        if (currentMonthRevenue == null) currentMonthRevenue = 0.0;

        Double lastMonthRevenue = ordersRepository.getRevenueByMonth(currentMonth - 1, currentYear);
        if (lastMonthRevenue == null) lastMonthRevenue = 0.0;

        Double monthlyGrowth = currentMonthRevenue - lastMonthRevenue;
        Double avgRevenuePerUser = totalRevenue / activeUsers;

        DashboardDTO dto = new DashboardDTO();
        dto.setTotalRevenue(totalRevenue);
        dto.setActiveUsers(activeUsers);
        dto.setMonthlyRevenueGrowth(monthlyGrowth);
        dto.setAverageRevenuePerUser(avgRevenuePerUser);

        // Chart Revenue
        List<MonthlyRevenueDTO> chartData = ordersRepository.getMonthlyRevenue().stream()
                .map(obj -> new MonthlyRevenueDTO((int) obj[0], (double) obj[1]))
                .collect(Collectors.toList());
        dto.setMonthlyRevenueChart(chartData);

        // Top Users
        List<TopUserRevenueDTO> topUsers = ordersRepository.getTopUserRevenue().stream()
                .map(obj -> new TopUserRevenueDTO((Integer) obj[0], (String) obj[1], (Double) obj[2]))
                .collect(Collectors.toList());
        dto.setTopUserRevenue(topUsers);

        // Genre Popularity
        List<GenreInsightDTO> genres = bookCategoryRepository.getGenrePopularity().stream()
                .map(obj -> new GenreInsightDTO((String) obj[0], (Long) obj[1]))
                .collect(Collectors.toList());
        dto.setGenrePopularity(genres);

        return dto;
    }
}
