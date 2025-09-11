export interface PageHeaderProps {
    title: string;
    description?: string;
}

export default function PageHeader({props}: {props: PageHeaderProps}){
    return(
        <>
            <div className="m-8 mb-0 p-8 bg-card/30 rounded-lg border border-border">
                <div className="space-y-4 animate-fade-in">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight whitespace-pre">{props.title}</h1>
                        <p className="md:text-lg text-muted-foreground mt-2">
                            {props?.description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}