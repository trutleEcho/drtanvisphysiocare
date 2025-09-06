import FaultyTerminal from "@/components/backgrounds/faulty-terminal";
import PageHeader from "@/components/composable/page-header";

export default function DeviceNotSupported() {
    return (
        <div className="w-full h-screen relative md:hidden">
            <FaultyTerminal
                scale={1.5}
                gridMul={[2, 1]}
                digitSize={1.2}
                timeScale={1}
                pause={false}
                scanlineIntensity={1}
                glitchAmount={1}
                flickerAmount={1}
                noiseAmp={1}
                chromaticAberration={0}
                dither={0}
                curvature={0}
                tint="#ffffff"
                mouseReact
                mouseStrength={0.5}
                pageLoadAnimation={false}
                brightness={1}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl">
                <PageHeader props={{
                    title: "Device Not Supported",
                    description: "Current device is not supported. Please use a desktop or laptop to access this website."
                }}/>
            </div>
        </div>
    )
}