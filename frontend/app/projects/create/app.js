import ProjectSummary from "./forms/projectSummary";
import ProposalSummary from "./forms/proposalSummary";
import ClientSummary from "./forms/clientSummary";
import ConsultationSummary from "./forms/consultationSummary";
import AutoForm, { AutoFormSubmit } from "@components/ui/auto-form";

function App() {
    return (
        <>
            <div className="mx-auto my-6 max-w-lg space-y-8">
                <ProjectSummary />
                <ProposalSummary />
                <ClientSummary />
                <ConsultationSummary />
                <AutoFormSubmit>Send now</AutoFormSubmit>
            </div>
        </>
    );
}

export default App;
