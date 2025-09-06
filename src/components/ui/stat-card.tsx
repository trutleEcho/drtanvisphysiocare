import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {TrendingDown, TrendingUp, Users} from "lucide-react";

export interface StatCardProps {
    title: string;
    value?: string;
    icon: React.ReactNode;
    trend?: string;
    trendValue?: number;
    trendIsPercentage?: boolean;
}

export default function StatCard({props}: { props: StatCardProps }) {
    return (
        <Card
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-card/80">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {props.title}
                </CardTitle>
                <div className="p-2 bg-primary/10 rounded-lg">
                    {props.icon}
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-foreground">{props.value}</div>
                <div className="flex items-center space-x-1">
                    <div className="flex items-center text-primary text-sm font-medium">
                        {props.trendValue && props.trendValue > 0 ? (
                            <>
                                <TrendingUp className="h-3 w-3 mr-1"/>
                                + {props.trendValue} {props.trendIsPercentage ? "%" : ""}
                            </>
                            ) : (
                                <>
                                    <TrendingDown className="h-3 w-3 mr-1"/>
                                    - {props.trendValue} {props.trendIsPercentage ? "%" : ""}
                                </>
                            )
                        }
                    </div>
                    <span className="text-muted-foreground text-sm">{props.trend}</span>
                </div>
            </CardContent>
        </Card>
    )
}