import { useEffect, useState } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { IconType } from "react-icons";
import { motion } from "framer-motion";

import { AppWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import { WORK } from "../../constants/appCollections";
import "./Work.scss";

interface IAnimateCard {
    y: number;
    opacity: number;
}

interface IWork {
    title: string;
    description: string;
    name: string;
    imgUrl: string;
    projectLink: string;
    codeLink: string;
    tags: string[];
}

const Work = () => {
    const [activeFilter, setActiveFilter] = useState<string>("All");
    const [works, setWorks] = useState<IWork[]>([]);
    const [filterWork, setFilterWork] = useState<IWork[]>([]);
    const [animateCard, setAnimateCard] = useState<IAnimateCard>({
        y: 0,
        opacity: 1,
    });

    useEffect(() => {
        const query = '*[_type == "works"]';

        client.fetch(query).then((data) => {
            setWorks(data);
            setFilterWork(data);
        });
    }, []);

    const handleWorkFilter = (item: string) => {
        setActiveFilter(item);
        setAnimateCard({ y: 100, opacity: 0 });

        setTimeout(() => {
            setAnimateCard({ y: 0, opacity: 1 });

            if (item === "All") {
                setFilterWork(works);
            } else {
                setFilterWork(works.filter((work) => work.tags.includes(item)));
            }
        }, 500);
    };
    return (
        <>
            <h2 className="head-text">
                My Creative <span>Portfolio</span> section
            </h2>

            <div className="app__work-filter">
                {WORK.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleWorkFilter(item)}
                        className={`app__work-filter-item app__flex p-text ${
                            activeFilter === item ? "item-active" : ""
                        }`}
                    >
                        {item}
                    </div>
                ))}
            </div>

            <motion.div
                animate={animateCard}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className="app__work-portfolio"
            >
                {filterWork.map((work, index) => (
                    <div className="app__work-item app__flex" key={index}>
                        <div className="app__work-img app__flex">
                            <img
                                src={urlFor(work.imgUrl).url()}
                                alt={work.name}
                            />

                            <motion.div
                                whileHover={{ opacity: [0, 1] }}
                                transition={{
                                    duration: 0.25,
                                    ease: "easeInOut",
                                    staggerChildren: 0.5,
                                }}
                                className="app__work-hover app__flex"
                            >
                                <IconSeeProject
                                    link={work.projectLink}
                                    Icon={AiFillEye}
                                />
                                <IconSeeProject
                                    link={work.codeLink}
                                    Icon={AiFillGithub}
                                />
                            </motion.div>
                        </div>

                        <div className="app__work-content app__flex">
                            <h4 className="bold-text">{work.title}</h4>
                            <p className="p-text" style={{ marginTop: 10 }}>
                                {work.description}
                            </p>

                            <div className="app__work-tag app__flex">
                                <p className="p-text">{work.tags[0]}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </>
    );
};

export default AppWrap(Work, "work");

interface IIconSeeProject {
    link: string;
    Icon: IconType;
}

const IconSeeProject = ({ link, Icon }: IIconSeeProject) => {
    return (
        <a href={link} target="_blank" rel="noreferrer">
            <motion.div
                whileInView={{ scale: [0, 1] }}
                whileHover={{ scale: [1, 0.9] }}
                transition={{
                    duration: 0.25,
                }}
                className="app__flex"
            >
                <Icon />
            </motion.div>
        </a>
    );
};
