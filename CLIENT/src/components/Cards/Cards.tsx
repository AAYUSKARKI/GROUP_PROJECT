import Card from "../Card/Card";
import photo1 from '../../../../assests/rose1.jpg'
import photo2 from '../../../../assests/arch.jpg'
import photo3 from '../../../../assests/coffee.jpg'
import photo4 from '../../../../assests/rootready.jpg'
import photo5 from '../../../../assests/gnu.jpg'
import photo6 from '../../../../assests/sleepready.jpg'
import photo7 from '../../../../assests/silicon.jpg'
import photo8 from '../../../../assests/piracyready.jpg'
import photo9 from '../../../../assests/openready.jpg'
function Cards() {
    return (
        <div className="grid grid-cols-2 gap-1">
            <Card photo={photo1} title="Rose T-Shirt" price="900"/>
            <Card photo={photo2} title="Arch T-Shirt" price="999" />
            <Card photo={photo3} title="Coffee T-Shirt" price="1100"/>
            <Card photo={photo4} title="Root Ready T-Shirt" price="1200"/>
            <Card photo={photo5} title="GNU T-Shirt" price="800"/>
            <Card photo={photo6} title="Sleep Ready T-Shirt" price="899"/>
            <Card photo={photo7} title="Silicon T-Shirt" price="1500"/>
            <Card photo={photo8} title="Piracy Ready T-Shirt" price="2000"/>
            <Card photo={photo9} title="Open Ready T-Shirt" price="1000"/>
        </div>
    );
}

export default Cards;