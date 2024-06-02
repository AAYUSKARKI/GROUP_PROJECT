import Card from "../Card/Card";
import photo1 from '../../../../assests/rose1.jpg'
import photo2 from '../../../../assests/arch.jpg'
import photo3 from '../../../../assests/coffee.jpg'
import photo9 from '../../../../assests/openready.jpg'
function Cards() {
    return (
        <div className="grid grid-cols-2 gap-1">
            <Card photo={photo1} title="Rose T-Shirt" price="900"/>
            <Card photo={photo2} title="Arch T-Shirt" price="999" />
            <Card photo={photo3} title="Coffee T-Shirt" price="1100"/>
            <Card photo={photo9} title="Open Ready T-Shirt" price="1000"/>
        </div>
    );
}

export default Cards;