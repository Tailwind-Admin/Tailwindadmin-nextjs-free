"use client"
import React, { useState } from 'react';
import dynamic from "next/dynamic";
import CardBox from '../shared/CardBox';
import { Select } from 'flowbite-react';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


const SalesOverview = () => {
    const [selectedMonth, setSelectedMonth] = useState("March 2025");

    const chartDataByMonth: Record<string, any> = {
        "March 2025": {
            series: [
                { name: "Earnings this month", data: [1.5, 2.7, 2.2, 3.6, 1.5, 1.0, 1.4, 2.4, 1.9, 2.3, 1.4, 1.1] },
                { name: "Expense this month", data: [-1.8, -1.1, -2.5, -1.5, -0.6, -1.8, -1.2, -2.3, -1.9, -2.3, -1.2, -2.5] },
            ],
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            }
        },
        "April 2025": {
            series: [
                { name: "Earnings this month", data: [2.0, 2.5, 2.8, 3.2, 2.0, 1.5, 3.6, 1.5, 1.0, 1.4, 2.4, 1.9] },
                { name: "Expense this month", data: [-1.2, -1.5, -2.0, -1.0, -0.8, -1.3, -1.5, -0.6, -1.8, -1.2, -2.3, -1.9] },
            ],
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            }
        },
        "May 2025": {
            series: [
                { name: "Earnings this month", data: [1.8, 2.2, 2.6, 3.0, 1.7, 1.2, 2.0, 2.5, 2.8, 3.2, 2.0, 1.5] },
                { name: "Expense this month", data: [-1.5, -1.3, -2.2, -1.2, -0.7, -1.6, -1.2, -1.5, -2.0, -1.0, -0.8, -1.3] },
            ],
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            }
        },
        "June 2025": {
            series: [
                { name: "Earnings this month", data: [2.1, 2.9, 2.4, 3.4, 2.1, 1.3, 1.8, 2.2, 2.6, 3.0, 1.7, 1.2] },
                { name: "Expense this month", data: [-1.7, -1.0, -2.3, -1.7, -0.5, -1.7, -1.5, -1.3, -2.2, -1.2, -0.7, -1.6] },
            ],
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            }
        },
        "July 2025": {
            series: [
                { name: "Earnings this month", data: [2.1, 2.9, 2.4, 3.4, 2.1, 1.3, 2.4, 3.4, 2.1, 1.3, 1.8, 2.2] },
                { name: "Expense this month", data: [-1.7, -1.0, -2.3, -1.7, -0.5, -1.7, -2.3, -1.7, -0.5, -1.7, -1.5, -1.3] },
            ],
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            }
        },
    };

    const baseChartOptions = {
        chart: {
            toolbar: { show: false },
            type: "bar" as const,
            fontFamily: "inherit",
            foreColor: "#adb0bb",
            height: 310,
            stacked: true,
            width: "100%",
            offsetX: -20,
            animations: {
                enabled: true,
                easing: 'easeinout' as const,
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150,
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 800,
                },
            },
        },
        colors: ["var(--color-primary)", "var(--color-secondary)"],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: "60%",
                columnWidth: "20%",
                borderRadius: 6,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            } satisfies {
                borderRadiusApplication?: 'end' | 'around';
                borderRadiusWhenStacked?: 'all';
                horizontal?: boolean;
                barHeight?: string;
                columnWidth?: string;
                borderRadius?: number;
            },
        },
        dataLabels: { enabled: false },
        legend: { show: false },
        grid: {
            borderColor: "rgba(0,0,0,0.1)",
            strokeDashArray: 3,
        },
        yaxis: { min: -4, max: 4, tickAmount: 4 },
        tooltip: { theme: "dark" },
    };

    const ChartData = {
        ...baseChartOptions,
        xaxis: chartDataByMonth[selectedMonth].xaxis,
    };

    return (

        <CardBox className='pb-0 h-full w-full'>
            <div className="sm:flex items-center justify-between mb-6">
                <div>
                    <h5 className="card-title">Sales Overview</h5>
                </div>
                <div className="sm:mt-0 mt-4">
                    <Select
                        className="form-control sales-overview select-md"
                        value={selectedMonth}
                        onChange={e => setSelectedMonth(e.target.value)}
                    >
                        <option>March 2025</option>
                        <option>April 2025</option>
                        <option>May 2025</option>
                        <option>June 2025</option>
                        <option>July 2025</option>
                    </Select>
                </div>
            </div>
            <Chart
                options={ChartData}
                series={chartDataByMonth[selectedMonth].series}
                type="bar"
                height="316px"
                width={"100%"}
            />
        </CardBox>
    );
};

export default SalesOverview;