export interface Area {
  slug: string
  name: string
  postcodes: string[]
  nearestTestCentre: string
  nearbyAreas: string[]
  description: string
}

const AREAS: Area[] = [
  {
    slug: 'barnet',
    name: 'Barnet',
    postcodes: ['EN5'],
    nearestTestCentre: 'Barnet',
    nearbyAreas: ['Whetstone', 'Edgware', 'Southgate', 'Mill Hill'],
    description:
      "Barnet sits at the very top of North London, where the High Street blends period architecture with busy junctions — perfect for building real-world confidence. You'll practise on the A1000 and residential back roads before heading to the nearby Barnet test centre.",
  },
  {
    slug: 'camden',
    name: 'Camden',
    postcodes: ['NW1'],
    nearestTestCentre: 'Wood Green',
    nearbyAreas: ['Hampstead', 'Highgate', 'Crouch End'],
    description:
      "Camden is one of the busiest corridors in North London — Chalk Farm Road, the Euston underpass, and the constant churn of bus lanes keep lessons interesting. The mix of one-ways and pedestrian crossings gives learners an edge when it comes to test day awareness.",
  },
  {
    slug: 'colindale',
    name: 'Colindale',
    postcodes: ['NW9'],
    nearestTestCentre: 'Mill Hill',
    nearbyAreas: ['Hendon', 'Edgware', 'Mill Hill', 'Cricklewood'],
    description:
      "Colindale straddles the A5 (Edgware Road), one of London's oldest arterial routes, giving learners experience on fast, multi-lane roads alongside quieter residential estates. The Brent Cross flyover and nearby retail park routes make for ideal dual-carriageway and roundabout practice, all a short drive from the Mill Hill test centre.",
  },
  {
    slug: 'cricklewood',
    name: 'Cricklewood',
    postcodes: ['NW2'],
    nearestTestCentre: 'Mill Hill',
    nearbyAreas: ['Colindale', 'Hendon', 'Golders Green', 'Hampstead'],
    description:
      "Cricklewood Broadway is a lively high street full of bus stops, parked delivery vehicles, and pedestrian crossings — exactly the conditions examiners test you on. The close proximity to the North Circular (A406) means you get genuine fast-road experience before your Mill Hill test.",
  },
  {
    slug: 'crouch-end',
    name: 'Crouch End',
    postcodes: ['N8'],
    nearestTestCentre: 'Wood Green',
    nearbyAreas: ['Highgate', 'Muswell Hill', 'Tottenham', 'Camden'],
    description:
      "Crouch End is all about narrow residential streets, tight junctions, and the famously tricky Crouch End Broadway clock-tower roundabout. Getting comfortable here means you'll handle the Wood Green test centre routes with real composure.",
  },
  {
    slug: 'edgware',
    name: 'Edgware',
    postcodes: ['HA8'],
    nearestTestCentre: 'Mill Hill',
    nearbyAreas: ['Barnet', 'Mill Hill', 'Colindale', 'Whetstone'],
    description:
      "Edgware's wide high street and the busy A5/A41 interchange give learners a solid grounding in multi-lane driving and complex signal-controlled junctions. It's a straight run down to the Mill Hill test centre along roads you'll have already practised on.",
  },
  {
    slug: 'edmonton',
    name: 'Edmonton',
    postcodes: ['N9', 'N18'],
    nearestTestCentre: 'Enfield',
    nearbyAreas: ['Tottenham', 'Southgate', 'Walthamstow'],
    description:
      "Edmonton covers the busy A1010 corridor and the roads around Edmonton Green shopping centre, giving learners confidence with retail-area hazards and bus-lane compliance. The Enfield test centre is close by, and the routes mirror the everyday roads you'll be using once you've passed.",
  },
  {
    slug: 'finchley',
    name: 'Finchley',
    postcodes: ['N3', 'N12'],
    nearestTestCentre: 'Mill Hill',
    nearbyAreas: ['Whetstone', 'Golders Green', 'Hendon', 'Barnet'],
    description:
      "Finchley stretches across two postcodes, mixing the busy High Road (A1000) with wide suburban avenues — a great combination for building both A-road confidence and precision parking skills. The Mill Hill test centre is a comfortable 15-minute drive through roads you'll know well by test day.",
  },
  {
    slug: 'golders-green',
    name: 'Golders Green',
    postcodes: ['NW11'],
    nearestTestCentre: 'Mill Hill',
    nearbyAreas: ['Hendon', 'Finchley', 'Hampstead', 'Cricklewood'],
    description:
      "Golders Green Road is a genuinely challenging learner environment — tight bus lanes, a busy Tube interchange, and pedestrians in all directions. Once you've mastered the high street and Hoop Lane roundabout, the Mill Hill test routes feel straightforward by comparison.",
  },
  {
    slug: 'hampstead',
    name: 'Hampstead',
    postcodes: ['NW3'],
    nearestTestCentre: 'Wood Green',
    nearbyAreas: ['Golders Green', 'Camden', 'Highgate', 'Cricklewood'],
    description:
      "Hampstead's steep, narrow lanes and the sweeping Heath-side roads offer a driving experience unlike any other part of North London. You'll build car control on gradients and master the art of giving way on single-track roads — skills that serve you far beyond test day.",
  },
  {
    slug: 'hendon',
    name: 'Hendon',
    postcodes: ['NW4'],
    nearestTestCentre: 'Mill Hill',
    nearbyAreas: ['Golders Green', 'Cricklewood', 'Mill Hill', 'Colindale'],
    description:
      "Hendon sits on the A41 with quick access to the M1 — you'll get experience on both fast A-roads and the residential streets around Brent Cross. Great prep for the Mill Hill test centre, just a short drive north.",
  },
  {
    slug: 'highgate',
    name: 'Highgate',
    postcodes: ['N6'],
    nearestTestCentre: 'Wood Green',
    nearbyAreas: ['Crouch End', 'Hampstead', 'Muswell Hill', 'Camden'],
    description:
      "Highgate Village perches on one of North London's highest ridges, and the hilly routes demand confident clutch control and hill-start precision. The Archway Road and Muswell Hill Road give plenty of opportunity to practise overtaking and lane discipline before your Wood Green test.",
  },
  {
    slug: 'mill-hill',
    name: 'Mill Hill',
    postcodes: ['NW7'],
    nearestTestCentre: 'Mill Hill',
    nearbyAreas: ['Edgware', 'Hendon', 'Barnet', 'Colindale'],
    description:
      "Mill Hill is home to one of North London's busiest DVSA test centres, so taking lessons here means you'll drive the actual examiner routes from day one. The mix of the A1 bypass and quiet Mill Hill Broadway gives a well-rounded test preparation that's hard to beat.",
  },
  {
    slug: 'muswell-hill',
    name: 'Muswell Hill',
    postcodes: ['N10'],
    nearestTestCentre: 'Wood Green',
    nearbyAreas: ['Highgate', 'Crouch End', 'Southgate', 'Tottenham'],
    description:
      "Muswell Hill's famous Broadway roundabout, paired with the long Fortis Green Road descent, makes it an excellent area for learning hill starts, roundabout priority, and pedestrian awareness. Everything feeds naturally into the Wood Green test centre routes just a few miles east.",
  },
  {
    slug: 'southgate',
    name: 'Southgate',
    postcodes: ['N14'],
    nearestTestCentre: 'Enfield',
    nearbyAreas: ['Barnet', 'Edmonton', 'Muswell Hill', 'Whetstone'],
    description:
      "Southgate's circular one-way system around the Underground station is one of the trickier local features learners encounter — master it early and complex junctions anywhere in London will feel manageable. The Enfield test centre is a straightforward 10-minute drive up the A110.",
  },
  {
    slug: 'tottenham',
    name: 'Tottenham',
    postcodes: ['N17'],
    nearestTestCentre: 'Wood Green',
    nearbyAreas: ['Edmonton', 'Wood Green', 'Crouch End', 'Walthamstow'],
    description:
      "Tottenham High Road is one of North London's most demanding driving corridors — bus lanes, cyclists, loading bays, and signalised pelican crossings in quick succession. Lessons here build the situational awareness that makes the Wood Green test feel calm.",
  },
  {
    slug: 'walthamstow',
    name: 'Walthamstow',
    postcodes: ['E17'],
    nearestTestCentre: 'Wanstead',
    nearbyAreas: ['Tottenham', 'Edmonton', 'Wood Green'],
    description:
      "Walthamstow sits at the eastern edge of our coverage, with Hoe Street and the Wood Street grid providing solid urban driving practice. The Wanstead test centre covers this patch, and the routes through Forest Road and the North Circular give learners good dual-carriageway experience.",
  },
  {
    slug: 'whetstone',
    name: 'Whetstone',
    postcodes: ['N20'],
    nearestTestCentre: 'Mill Hill',
    nearbyAreas: ['Barnet', 'Finchley', 'Southgate', 'Edgware'],
    description:
      "Whetstone High Road is a quieter, more approachable stretch than neighbouring Barnet, making it ideal for building early confidence before venturing onto the A1 or North Circular. The Mill Hill test centre is a few minutes west, and the routes overlap heavily with everyday Whetstone roads.",
  },
  {
    slug: 'wood-green',
    name: 'Wood Green',
    postcodes: ['N22'],
    nearestTestCentre: 'Wood Green',
    nearbyAreas: ['Tottenham', 'Crouch End', 'Muswell Hill', 'Southgate'],
    description:
      "Wood Green is home to one of North London's busiest DVSA test centres, so learners benefit from practising on the exact roads examiners use every day. The Shopping City roundabout and the busy A109 corridor make sure there are no surprises when test day arrives.",
  },
]

export { AREAS }
