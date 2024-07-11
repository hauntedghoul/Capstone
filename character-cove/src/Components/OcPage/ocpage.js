import React from 'react'
import './ocpage.css'

const ocpage = () => {
    return (
        <div className='createoc-container'>
            <div>
                <img className='ocbanner' src='/images/Banner.jpg' alt='banner' />
                <img src='/images/Rooster.jpg' alt='pfp' className='oc-main' />
                <div className='name'>
                    <h2>
                        Levi "Red" Boone
                    </h2>
                    <h4>
                        i know im good but idk if im that good
                    </h4>
                </div>
                <div className='tag-gen'>
                    <div className='general'>
                        <h2>GENERAL INFO</h2>
                        <p>Birthday: October 20, 1991
                        </p>
                        <p>Age: 33
                        </p>
                        <p>Height: 6'7
                        </p>
                        <p>Gender: Male
                        </p>
                        <p>Pronouns: He/Him
                        </p>
                        <p>Nicknames: too many
                        </p>
                        <p>Birthplace: marfa,tx
                        </p>
                        <p>Current Residence: wyoming
                        </p>
                        <p>Family: to many
                        </p>
                        <p>Occupation: combat medic
                        </p>
                    </div>
                    <div className='tags'>
                        <h3>TAGS</h3>
                        <input className='gen-info' type='text' id='tag' name='tag' placeholder='tags...' />
                        <button className='tag-button'>ADD</button>
                        <p>tags will go here when added</p>
                    </div>
                </div>
                <div className='persona-container'>
                    <h3>PERSONALITY</h3>
                    <p className='personality'>
                        Levi Boone is nothing short of an ambitious man, and has a personality to match. Many soldiers in his company and even throughout the military see him as a man who takes no funny business, and is nothing short of the perfect soldier. He stays focused on task, he has to keep the men in his company alive and in the best state they can be. His cold, critical ways of thinking are both a blessing and a curse, and have led him to have more than a few run ins with a punch to the face.

                        While not on the job, Levi is a very different person than compared to his usual stoic demeanor. He's much more laidback, and more willing to have simple conversations with people than when he's at work. Off the job, he's just a simple man wanting to take care of his kid and keep his ranch running the best that it can. He cares greatly for the things in his life, and is willing to do anything to keep those things safe and taken care of.
                    </p>
                </div>
                <div className='persona-container'>
                    <h3>APPEARANCE</h3>
                    <p className='personality'>
                        The first thing people notice about Levi is his height—at 6'7", he towers over most. His mask also makes him stand out. Levi's face is angular, with a rectangular shape, short blonde hair that's graying from stress, a large nose that looks frequently broken, thin lips often in a frown, a mustache, and brown eyes with gold speckles. His face is marked with numerous scars: a large one across his nose, a medium one on the left side, and several smaller ones, including one through his eyebrow. His eyebrows are usually furrowed, giving him a concerned expression.
                    </p>
                </div>
                <div className='persona-container'>
                    <h3>HISTORY</h3>
                    <p className='personality'>
                        Elk Creek is a ranch that specializes in circuit level broncs, while doing regular ranch business on the side (cattle and what-not). The ranch is located in central Wyoming and stretches roughly 250,000 acres. With this massive amount of land and priorities there are quite a few workers (only about 10 main though). With this many workers there are accommodations made for ranch hands on the ranch. Newer/seasonal or even lower ranking workers stay in the bunk house, while higher ranking and more seasoned workers get to stay in the separate housing, which also happens to be closer to the main house. The higher your rank the closer to the main house. Main workers include Colt, Jamie, John, Henry, Bradley, Lewis, Connor, Miles, Jessie, and Rhett.

                        Ever since Levi took over, some call the ranch the 'Runaway Ranch', or 'Drifter Ranch' on the behalf of Levi frequently taking in people who don't have homes of their own. A lot of the workers will (and have) do some shady and evil shit against Levi's enemies at home, especially when he's deployed. While not advertised unless desperate, Elk Creek is always open to hire.

                        PASSING DOWN
                        Levi was not unfortunately born into money since he was being raised by cult that lived like it was the 1800s, the only thing this lent him was the skills to know how to take care of the land and animals he had been given, though not at this scale. Levi ended up obtaining this land through one of the cult priests who was just about the only person that actually wanted to see the kid happy, even if it went against the cult's beliefs. When Levi left the cult for the military the priest knew that he would end up needing a place to stay, and not having any money himself meant that he wouldn't be able to afford anything so he wrote to his much older and estranged brother about the situation with a plea to at least help one person that is trying to do something different, if not for him then for the kid. The older brother being... well old thought it would be a good opportunity to have someone to pass his land down to since he didn't have any kids of his own to inherit the place and money. The priest told Levi that this older brother was Levi's 'uncle' and told him to go there when he needed a place to stay.
                    </p>
                </div>
                <div className='images-container'>
                    <h3>IMAGES</h3>
                    <div className='character-container'>
                        <img className='characters' src='/images/Sam.jpg' alt='sam' />
                        <img className='characters' src='/images/Rooster.jpg' alt='sam' />
                        <img className='characters' src='/images/Doc.png' alt='sam' />
                        <img className='characters' src='/images/Graves.png' alt='sam' />
                        <img className='characters' src='/images/Sam.jpg' alt='sam' />
                        <img className='characters' src='/images/Rooster.jpg' alt='sam' />
                        <img className='characters' src='/images/Doc.png' alt='sam' />
                        <img className='characters' src='/images/Graves.png' alt='sam' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ocpage