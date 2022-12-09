import { NAVIGATION } from "../constants/navigations";

interface NavigationsDotsProps {
    active: string;
}

const NavigationsDots = ({ active }: NavigationsDotsProps) => {
    return (
        <div className="app__navigation">
            {NAVIGATION.map((item, index) => (
                <a
                    href={`#${item}`}
                    key={item + index}
                    className="app__navigation-dot"
                    style={
                        active === item ? { backgroundColor: "#313BAC" } : {}
                    }
                />
            ))}
        </div>
    );
};

export default NavigationsDots;
