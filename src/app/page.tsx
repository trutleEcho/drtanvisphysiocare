'use client'

import {BentoCard, BentoGrid} from "@/components/sections/home/bento-grid";
import {
    BellIcon,
    CalendarIcon,
    GlobeIcon,
} from "@radix-ui/react-icons";
import {HeartPulseIcon, StethoscopeIcon} from "lucide-react";
import {TestimonialsColumn} from "@/components/sections/home/testimonials-columns-1";
import { motion } from "motion/react";
import {HeroLanding} from "@/components/sections/home/hero-1";

const testimonials = [
    {
        text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        name: "Briana Patton",
        role: "Operations Manager",
    },
    {
        text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        name: "Bilal Ahmed",
        role: "IT Manager",
    },
    {
        text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        name: "Saman Malik",
        role: "Customer Support Lead",
    },
    {
        text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
        image: "https://randomuser.me/api/portraits/men/4.jpg",
        name: "Omar Raza",
        role: "CEO",
    },
    {
        text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
        image: "https://randomuser.me/api/portraits/women/5.jpg",
        name: "Zainab Hussain",
        role: "Project Manager",
    },
    {
        text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
        name: "Aliza Khan",
        role: "Business Analyst",
    },
    {
        text: "Our business functions improved with a user-friendly design and positive customer feedback.",
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        name: "Farhan Siddiqui",
        role: "Marketing Director",
    },
    {
        text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        name: "Sana Sheikh",
        role: "Sales Manager",
    },
    {
        text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.",
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        name: "Hassan Ali",
        role: "E-commerce Manager",
    },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const features = [
    {
        Icon: StethoscopeIcon,
        name: "Personalized Treatment",
        description: "Every patient gets a tailored physiotherapy plan designed for faster recovery.",
        href: "/services",
        cta: "Learn more",
        background: <img className="absolute -right-20 -top-20 opacity-40" />,
        className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
    },
    {
        Icon: HeartPulseIcon,
        name: "Pain Management",
        description: "Specialized techniques to reduce pain and improve your quality of life.",
        href: "/services",
        cta: "Learn more",
        background: <img className="absolute -right-20 -top-20 opacity-40" />,
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
        Icon: GlobeIcon,
        name: "Holistic Care",
        description: "Combining modern physiotherapy with holistic wellness practices.",
        href: "/about",
        cta: "Learn more",
        background: <img className="absolute -right-20 -top-20 opacity-40" />,
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
        Icon: CalendarIcon,
        name: "Easy Appointments",
        description: "Book and manage your appointments online with just a few clicks.",
        href: "/appointments",
        cta: "Book now",
        background: <img className="absolute -right-20 -top-20 opacity-40" />,
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
        Icon: BellIcon,
        name: "Follow-up Reminders",
        description: "Never miss a session — get notified about upcoming appointments.",
        href: "/appointments",
        cta: "Learn more",
        background: <img className="absolute -right-20 -top-20 opacity-40" />,
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
];


export default function HomePage(){
    return(
        <>
            <main className="w-full h-screen relative overflow-x-hidden ">
                <HeroLanding title="Welcome to Dr Tanvis PhysioCare" description="Your journey to recovery starts here."/>
                <section className="max-w-7xl p-8 mx-auto">
                    <section id="features" className="bg-background relative">
                        <div className="container z-10 mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
                            >
                                <div className="flex justify-center">
                                    <div className="border py-1 px-4 rounded-lg">Our Features</div>
                                </div>

                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
                                    What we offer
                                </h2>
                                <p className="text-center mt-5 opacity-75">
                                    Some of the features we offer to our patients.
                                </p>
                            </motion.div>
                            <BentoGrid className="grid grid-rows-5 lg:grid-rows-3 py-20">
                                {features.map((feature) => (
                                    <BentoCard key={feature.name} {...feature} />
                                ))}
                            </BentoGrid>
                        </div>
                    </section>
                    <section id="testimonials" className="bg-background my-20 relative">

                        <div className="container z-10 mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
                            >
                                <div className="flex justify-center">
                                    <div className="border py-1 px-4 rounded-lg">Testimonials</div>
                                </div>

                                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
                                    What our users say
                                </h2>
                                <p className="text-center mt-5 opacity-75">
                                    See what our patients have to say about us.
                                </p>
                            </motion.div>

                            <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
                                <TestimonialsColumn testimonials={firstColumn} duration={15} />
                                <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                                <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                            </div>
                        </div>
                    </section>
                </section>
            </main>
        </>
    )
}
