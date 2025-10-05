import GenericBreadcrumb, {GenericBreadcrumbProps} from "@/components/ui/generic-breadcrumb";

export interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    breadcrumb?: GenericBreadcrumbProps;
}

export default function PageHeader({props}: {props: PageHeaderProps}){
    return(
        <>
            <div className="m-8 mb-0 p-8 bg-card/30 rounded-lg border border-border space-y-8">
                {props.breadcrumb && <GenericBreadcrumb props={props.breadcrumb}/>}
                <div className="space-y-4 animate-fade-in flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight whitespace-pre">{props.title}</h1>
                        <p className="md:text-lg text-muted-foreground mt-2">
                            {props?.description}
                        </p>
                    </div>
                    {props.actions}
                </div>
            </div>
        </>
    )
}