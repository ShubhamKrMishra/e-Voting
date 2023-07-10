import React from "react";
// import "./App.css";
import './LinerProgress.css'
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
} from "recharts";

const LinerProgress = () => {
    const data = [
        { name: "Facebook", users: 25 },
        { name: "Instagram", users: 15 },
        { name: "Twiter", users: 100 },
        { name: "Telegram", users: 50 },
    ];

    return (
        <div style={{ textAlign: "center" }}>
            <div className="dan">
                <div class="w-4/5">
                    <PieChart width={400} height={400}>
                        <Pie
                            dataKey="users"
                            isAnimationActive={false}
                            data={data}
                            cx={200}
                            cy={200}
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip />
                    </PieChart>
                </div>
                <div class="w-4/5">
                    <BarChart
                        width={400}
                        height={400}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 80,
                            bottom: 5,
                        }}
                        barSize={15}
                    >
                        <XAxis
                            dataKey="name"
                            scale="point"
                            padding={{ left: 8, right: 10 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default LinerProgress;