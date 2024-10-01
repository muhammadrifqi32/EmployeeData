$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: 'https://localhost:7146/api/Employees/gender-count',
        success: function (response) {
            console.log(response)
            var labels = [];
            var data = [];

            // Loop through the API response to extract gender and countGender
            response.data.forEach(function (item) {
                labels.push(item.gender); // Get gender for labels
                data.push(item.countGender); // Get count for dataset
            });

            // Data for the charts
            var chartData = {
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
                    }
                ]
            };

            var chartOptions = {
                maintainAspectRatio: false,
                responsive: true,
            };

            // DONUT CHART
            var donutGenderCanvas = $('#donutGender').get(0).getContext('2d');
            new Chart(donutGenderCanvas, {
                type: 'doughnut',
                data: chartData,
                options: chartOptions
            });

            // PIE CHART
            var pieGenderCanvas = $('#pieGender').get(0).getContext('2d');
            new Chart(pieGenderCanvas, {
                type: 'pie',
                data: chartData,
                options: chartOptions
            });

            // BAR CHART
            var barGenderCanvas = $('#barGender').get(0).getContext('2d');
            new Chart(barGenderCanvas, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Count of Genders',
                        data: data,
                        backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

        },
        error: function (err) {
            console.error('Error fetching data:', err);
        }
    });
})