export const  SelectTravellerList=[
    {
        id:1,
        title:'Just Me',
        desc:'A Sole traveles in exploration',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A  group of fun loving adventure',
        people:'3 to 5 people'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill seekes',
        people:'5 to 10 people'
    }
]


export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average scale'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
    }
]

export const AI_PROMPT='Generate Travel Plan in STRICT JSON format for Location: {location}, for {totalDays} Days and {totalNights} Nights for {traveller} with a {budget} budget with a Flight details,Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions about Places to visit nearby with PlaceName, Place Details, Place image Url, Geo Coordinates, ticket Pricing, time To travel each of the location for {totalDays} days and {totalNights} night with each day plan with best time to visit in valid JSON Format only.'