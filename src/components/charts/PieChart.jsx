import React from 'react'
import ReactApexChart from 'react-apexcharts';

const PieChart = () => {
    const options = {
        chart: {
            type: 'donut',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const series = [44, 55];

    return (
        <div id='PieChart'>
            <ReactApexChart options={options} series={series} height={400} type="donut"  />
        </div>
    )
}

export default PieChart
