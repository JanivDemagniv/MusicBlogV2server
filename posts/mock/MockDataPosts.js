const chalk = require("chalk");
const User = require("../../users/models/mongodb/User");
const Post = require("../models/mongodb/Post");
const { createPost } = require("../models/postAccessDataService");

const mockDataPosts = [
    {
        title: 'a gritty portrait of the 90s',
        subtitle: 'nas paints life in the projects',
        artist: 'nas',
        album: 'illmatic',
        content: `<p><strong>nas’s </strong><em><u>illmatic</u></em><u> </u>is widely regarded as one of the greatest hip-hop albums of all time. released in 1994, it’s a raw, gritty depiction of life in new york’s queensbridge projects. nas’s storytelling is vivid, capturing the essence of urban struggle with poetic finesse.</p><p><br></p><p>tracks like “n.y. state of mind” and “the world is yours” are not only catchy but filled with intricate rhymes and metaphors that paint vivid images of his world. the production features legends like dj premier and pete rock, who created beats that perfectly match nas’s introspective lyrics.</p><p><br></p><p>at only 20 years old, nas showed a maturity and insight beyond his years, and the album’s concise 10 tracks make every verse count.</p><p><br></p><p><strong><em>illmatic</em> </strong>continues to influence generations of rappers, embodying the essence of storytelling that hip-hop fans <strong>treasure</strong>.</p>`,
        image: {
            url: 'https://cdn.shoplightspeed.com/shops/610080/files/42763811/nas-illmatic.jpg',
            alt: 'album cover'
        },
        creator: {
            name: '',
            _id: ''
        },
        likes: [],
        comments: []
    },
    {
        title: 'the east coast rises',
        subtitle: `biggie’s life and struggles on display`,
        artist: 'the notorious b.i.g',
        album: 'ready to die',
        content: `<p><strong>biggie smalls’</strong> <em><u>ready to die</u></em> is a masterpiece that chronicles the highs and lows of his life. from “juicy,” which highlights his rise to fame, to “suicidal thoughts,” an introspective look at his darkest moments, the album’s range is remarkable.</p><p><br></p><p>biggie’s storytelling and unmatched flow allow listeners to step into his shoes, experiencing the rollercoaster of his life in brooklyn.</p><p>roduced by legends like dj premier and easy mo bee, the album offers a raw, soulful sound that complements biggie’s rugged voice.</p><p><br></p><p><strong><em>ready to die</em></strong> remains an east coast staple and a defining moment in hip-hop history, capturing the raw energy of 90s new york while resonating deeply with universal themes of struggle, success, and redemption.</p>`,
        image: {
            url: 'https://cdn.shoplightspeed.com/shops/610080/files/43391573/notorious-big-ready-to-die.jpg',
            alt: 'album cover'
        },
        creator: {
            name: '',
            _id: ''
        },
        likes: [],
        comments: []
    },
    {
        title: 'the diary of the south',
        subtitle: 'outkast redefines the southern rap sound',
        artist: 'outkast',
        album: 'aquemini',
        content: `<p><strong>outkast’s </strong><em><u>aquemini</u></em><u> </u>is a genre-bending masterpiece that established the south as a major player in hip-hop. with a mix of funk, soul, and rap, andré 3000 and big boi take listeners on a journey through life in atlanta, exploring themes of identity, love, and spirituality.</p><p><br></p><p>tracks like “rosa parks” and “da art of storytellin’ (pt. 1)” showcase their lyrical prowess and unique sound. the album stands out not only for its production but also for its philosophical depth, with both andré and big boi exploring existential questions.</p><p><br></p><p><strong><em>aquemini</em> </strong>is southern rap at its finest, pushing the boundaries of the genre and proving outkast’s status as <strong>visionaries</strong>.</p>`,
        image: {
            url: 'https://cdn.shoplightspeed.com/shops/610080/files/3354211/outkast-aquemini.jpg',
            alt: 'album cover'
        },
        creator: {
            name: '',
            _id: '',
            image: {
                url: '',
                alt: ''
            }
        },
        likes: [],
        comments: []
    },
    {
        title: 'a new sound for a new era',
        subtitle: `kanye’s genre-bending innovation`,
        artist: 'kanye west',
        album: 'the college dropout',
        content: `<p>with <em><u>the college dropout</u></em>, <strong>kanye west</strong> changed the game. released in 2004, the album defied conventions, bringing introspective lyrics and soulful beats to the mainstream.</p><p><br></p><p>tracks like “jesus walks” and “all falls down” touch on themes of faith, insecurity, and materialism, while kanye’s production blends soul samples with innovative techniques.</p><p><br></p><p>his lyrics are refreshingly honest, reflecting his struggles and triumphs. kanye’s debut album marked the arrival of a new voice in hip-hop—one unafraid to challenge norms and speak openly about vulnerability.</p><p><br></p><p><br></p><p><strong style="color: inherit;"><em>the college dropout</em></strong><span style="color: inherit;"> remains a classic, known for its originality and impact on hip-hop culture.</span></p>`,
        image: {
            url: 'https://cdn.shoplightspeed.com/shops/610080/files/56299358/kanye-west-the-college-dropout.jpg',
            alt: 'album cover'
        },
        creator: {
            name: '',
            _id: '',
            image: {
                url: '',
                alt: ''
            }
        },
        likes: [],
        comments: []
    },
    {
        title: 'the rise of conscious rap',
        subtitle: `j. cole’s poignant social commentary`,
        artist: 'j. cole',
        album: '2014 forest hills drive',
        content: `<p><strong>j. cole</strong>’s <em><u>2014 forest hills drive</u></em><u> </u>is a deeply personal album that resonates with social commentary and introspection.</p><p><br></p><p>named after his childhood home, the album explores themes of fame, family, and identity.</p><p><br></p><p>tracks like “no role modelz” and “love yourz” highlight the pitfalls of fame and the importance of self-worth. j. cole’s storytelling ability shines as he reflects on his journey from poverty to success, offering listeners insight into the human side of fame.</p><p><br></p><p><strong><em>2014 forest hills drive</em></strong> is both relatable and profound, cementing j. cole’s reputation as a voice for the people.</p>`,
        image: {
            url: 'https://cdn.shoplightspeed.com/shops/610080/files/3357549/j-cole-2014-forest-hills-drive.jpg',
            alt: 'album cover'
        },
        creator: {
            name: '',
            _id: '',
            image: {
                url: '',
                alt: ''
            }
        },
        likes: [],
        comments: []
    },
    {
        title: `the detroit legend’s second act`,
        subtitle: `eminem’s complex journey`,
        artist: 'eminem',
        album: 'Marshall mathers lp 2',
        content: `<p><em><u>the marshall mathers lp 2</u></em> is a comeback album that finds <strong>eminem </strong>reflecting on his legacy and past controversies.</p><p><br></p><p>it’s a mix of introspection and classic eminem humor, with tracks like “rap god” showcasing his lyrical skill and speed, while “the monster” delves into themes of fame and mental health. <strong>eminem’s </strong>ability to weave complex rhyme schemes and address personal struggles makes this album a strong follow-up to his earlier work.</p><p><br></p><p><strong><em>the marshall mathers lp 2</em></strong> is both nostalgic and innovative, capturing eminem’s journey and his determination to remain relevant in a changing music landscape.</p>`,
        image: {
            url: 'https://cdn.shoplightspeed.com/shops/610080/files/13695059/eminem-the-marshall-mathers-lp-2.jpg',
            alt: 'album cover'
        },
        creator: {
            name: '',
            _id: '',
            image: {
                url: '',
                alt: ''
            }
        },
        likes: [],
        comments: []
    },
    {
        title: `laughs, bars, and vulnerability: lil dicky’s musical journey in professional rapper`,
        subtitle: `a comedic rapper’s deep dive into real life and rhymes`,
        artist: 'lil dicky',
        album: 'professional rapper',
        content: `<p><strong>lil dicky</strong>’s <em><u>professional rapper</u></em> defies easy categorization, blending his signature humor with some surprisingly personal insights and technical skill that leave a lasting impression. known for his unconventional entry into the rap world, lil dicky is no stranger to using humor to tackle complex topics. however, <em>professional rapper</em> goes further, balancing wit and wordplay with an unexpected depth that keeps listeners hooked.</p><p><br></p><p>opening with tracks that lean into self-deprecating humor and cultural commentary, lil dicky shows off his comedic chops and keeps things light. tracks like "pillow talk" and "white crime" reveal his knack for storytelling, blending hilarious narratives with memorable hooks. the humor doesn’t undercut his talent; instead, it complements his unique storytelling approach.</p><p><br></p><p>as the album unfolds, though, lil dicky shifts gears, revealing a more vulnerable side. songs about identity, ambition, and self-doubt showcase his growth as an artist, inviting listeners to connect with him on a deeper level. tracks like "professional rapper" (featuring snoop dogg) and "molly" dive into personal struggles and relationships, showing that he’s more than just a comedic rapper—he’s an artist with something meaningful to say.</p><p><br></p><p>overall, <strong><em>professional rapper</em></strong> succeeds in blending humor and substance, showing off lil dicky’s technical skills while revealing new dimensions to his personality and craft. whether you're drawn in by his laugh-out-loud moments or his insightful bars, this album offers something for everyone, proving that <strong>lil dicky</strong> is here to stay.</p>`,
        image: {
            url: 'https://buymycomics.com/wp-content/uploads/2016/11/lil-dicky-pro-rapper-reissue-vinyl-1.jpeg',
            alt: 'album cover'
        },
        creator: {
            name: '',
            _id: '',
            image: {
                url: '',
                alt: ''
            }
        },
        likes: [],
        comments: []
    },
    {
        title: `the vibrant world of aminé's good for you`,
        subtitle: 'a refreshing take on modern hip-hop with a dash of personality',
        artist: 'aminé',
        album: 'good for you',
        content: `<p><strong>aminé’s </strong>debut album <em><u>good for you</u></em>, released in 2017, is a colorful and energetic project that highlights his unique approach to hip-hop. </p><p><br></p><p>known for its playful sound and bright visuals, the album features hit tracks like 'caroline' and 'spice girl,' capturing <strong>aminé’s </strong>knack for fun, catchy beats and clever lyrics. </p><p><br></p><p>he infuses the album with humor and authenticity, offering a fresh take on relationships, personal growth, and self-confidence.</p><p><br></p><p><em><u>good for you</u></em> stands out as a lighthearted yet introspective album that adds a vibrant voice to hip-hop.</p>`,
        image: {
            url: 'https://media.pitchfork.com/photos/597f92e2291a2e6aa9386055/master/pass/goodforyouamine.jpg',
            alt: 'album cover'
        },
        creator: {
            name: '',
            _id: '',
            image: {
                url: '',
                alt: ''
            }
        },
        likes: [],
        comments: []
    },
    {
        title: `a defining sound of grunge: pearl jam's ten`,
        subtitle: 'an album that redefined rock and raised a generation',
        artist: 'pearl jam',
        album: 'ten',
        content: `<p>pearl jam’s <em>ten</em>, released in 1991, remains a seminal work in rock music and one of the cornerstones of the grunge movement. the album didn’t just contribute to a new sound; it helped define the angst and urgency of a generation. eddie vedder’s raw, impassioned vocals and the band's intricate mix of heavy guitar riffs and profound lyricism became anthems for those navigating complex emotions of adolescence and beyond.</p><p><br></p><p>from the opening track, "once," listeners are plunged into a journey of self-reflection, social critique, and emotional upheaval. hits like "alive" and "even flow" showcase the band’s knack for blending intense guitar work with introspective themes, revealing layers of personal struggle, resilience, and survival. "jeremy," inspired by real-life tragedy, tackles themes of isolation and violence with haunting accuracy, solidifying pearl jam’s commitment to addressing real-world issues head-on.</p><p><br></p><p>the guitar work of mike mccready and stone gossard is both powerful and precise, creating textures that convey the raw energy of the seattle grunge scene. jeff ament’s bass lines add depth and richness, while dave krusen’s drumming on this record lays down a gritty foundation, giving the album an unforgettable sound that feels both personal and universal.</p><p><br></p><p><em>ten</em> is more than an album; it’s a cathartic experience. its legacy endures, cementing pearl jam as one of the most influential rock bands of the '90s. decades later, <em>ten</em> continues to resonate with listeners old and new, reminding us of the power of music to capture the complexities of the human experience.</p>`,
        image: {
            url: 'https://i.scdn.co/image/ab67616d0000b273d400d27cba05bb0545533864',
            alt: 'album cover'
        },
        creator: {
            name: '',
            _id: '',
            image: {
                url: '',
                alt: ''
            }
        },
        likes: [],
        comments: []
    },
    {
        title: 'a masterpiece of storytelling and social commentary',
        subtitle: 'an artistic triumph that blends hip-hop, jazz, and soul to reflect on identity, race, and empowerment',
        artist: 'kendrick lamar',
        album: 'to pimp a butterfly',
        content: `<p>kendrick lamar's <em>to pimp a butterfly</em>, released in 2015, is not just an album; it’s a profound cultural statement that transcends genre boundaries and elevates hip-hop to a new level of artistic expression. with its seamless blend of jazz, funk, soul, and rap, <em>to pimp a butterfly</em> offers a soundscape that is both revolutionary and deeply rooted in african-american musical traditions.</p><p><br></p><p>from the very first track, "wesley’s theory," lamar begins to weave a tapestry of themes: identity, race, fame, and systemic oppression. the album is a fearless exploration of blackness, resilience, and the struggles of achieving success while maintaining authenticity. the album’s most iconic moment, "alright," became a rallying cry for empowerment, with its triumphant message of hope and resistance in the face of adversity.</p><p><br></p><p>throughout <em>to pimp a butterfly</em>, lamar’s lyricism remains sharp and unapologetic. he confronts uncomfortable truths, from the complexities of self-love and self-hate in "u," to the haunting commentary on the commodification of black culture in "the blacker the berry." each track reveals new layers of depth, with lamar’s verses acting as both personal confessions and collective calls to action.</p><p><br></p><p>the instrumentation on <em>to pimp a butterfly</em> is a triumph in itself, with thundercat’s basslines, kamasi washington’s saxophone, and robert glasper’s jazz influence creating a lush, cinematic backdrop. the album’s use of live instrumentation sets it apart from other hip-hop projects, giving it a timeless feel that resonates with the social, political, and emotional undertones of its era.</p><p><br></p><p>the album is also deeply introspective, with kendrick lamar often examining the psychological toll of fame and the ways in which he’s been "pimped" by the system. the album’s title references the duality of achieving success and the disillusionment that can follow, especially when faced with societal pressures. tracks like "mortal man" delve into lamar’s own sense of responsibility as a leader, ultimately questioning the roles of artists and activists in a world that seems to perpetuate the same cycles of injustice.</p><p><br></p><p><em>to pimp a butterfly</em> is a triumph not only of artistic vision but of cultural relevance. with its bold risks, intricate production, and revolutionary storytelling, kendrick lamar’s third studio album remains one of the most important and powerful works in contemporary music. it’s an album that challenges, empowers, and resonates with listeners long after the final track fades away.</p>`,
        image: {
            url: 'https://i.scdn.co/image/ab67616d0000b273cdb645498cd3d8a2db4d05e1',
            alt: 'album cover'
        },
        creator: {
            name: '',
            _id: '',
            image: {
                url: '',
                alt: ''
            }
        },
        likes: [],
        comments: []
    },
];


const createPostMockData = async () => {
    try {
        let posts = await Post.find();
        let users = await User.find();
        let user = users[0];

        if (posts.length == 0) {
            mockDataPosts.forEach(async (post) => {
                await createPost({ ...post, creator: { name: user.userName, _id: user._id, image: { url: user.profilePic.url, alt: user.profilePic.alt } } });
            });
            console.log(chalk.blue('posts mock data has been created'));

            return
        };

        return
    } catch (error) {
        console.log('something Went Wrong');

    }
};

module.exports = createPostMockData;