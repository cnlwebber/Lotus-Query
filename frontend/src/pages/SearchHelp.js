import React, { useState, useEffect } from 'react';
/*
Search Tools:

    "v: or vision:" search the text of the card (idk about this, we don't have it in the database)

    "cmc> cmc< cmc<= cmc>= cmc=" cmc ranges/values
        
    "pow..." power ranges/values

    "tou..." toughness ranges/values

    "color:WUBRG" search for cards with these colors ANYWHERE

    "cmm:WUBRG" search for cards with the color IDENTITY matching

    "r: or rarity:" rarity of cards

    "l: or legal:" find cards that are legal in certain formats (may use ~)

    "s: or set:" find cards in given set code
*/
const SearchHelp = () => {
    return (
        <div className="searchHelpOuter">
        <div className="innerWrapper">
            <h1> Search Query Parameters </h1>
            <p> There are many ways that you can search for Magic the Gathering cards in Lotus Query! Each card characterstic can be queried using the parameters defined by their header. Note that code blocks prefixed by &apos;🔍&apos; are example queries within the search bar. </p>
            <h2> Name </h2>
            <p> In order to search a card by name, simply type it directly into the search bar! </p>
            <pre><code> black lotus </code></pre>
            
            <h2> Converted Mana Cost </h2>
            <p> A card&apos;s converted mana cost (or cmc) is the total number of mana pips that are required to cast the card. There are a few ways you can search by converted mana cost. The first way is explicitly, with an equal&apos;s sign:</p>
            <pre><code> cmc=4 </code></pre>
            <p> This query will return all cards stored within our database with an exact converted mana cost value of four. You can also use inequalities to express greater than, greater than or equal to, less than or equal to, or strictly less than using standard coding inequality symbols. </p>
            <pre><code> cmc&gt;8 </code></pre>
            <pre><code> cmc&lt;=2 </code></pre>
            
            <h2> Power &amp; Toughness </h2>
            <p> Power and toughness are statistics unique to creature cards in Magic the Gathering, and affect how it fares in battle. We query with these statstics using pow and tou for power and toughness respectively. Searching for both of these are done similarly to a card&apos;s converted mana cost, with equality or inequality symbols. We have strict equality such as:</p>
            <pre><code> pow=2 </code></pre>
            <pre><code> tou=8 </code></pre>
            <p> Or inequality symbols as detailed previously: </p>
            <pre><code> tou&lt;=3 </code></pre>
            <pre><code> pow&gt;9 </code></pre>

            <h2> Color </h2>
            <p>A card&apos;s color is determined by the following things: </p>
            <ul>
                <li> Casting cost </li>
                <li> Color-defining abilities </li>
                <li> Color indicator </li>
            </ul>
            <p> The combination of these three characterstics will determine the card&apos;s color. Each color can be any combination of the colors white, blue, black, red, and green, signified by a character of W, U, B, R, and G respectively. Using the color parameter you can search for any card containing the combination of colors you declare in the form of: </p>
            <pre><code> color:BR </code></pre>
            <p> In this example, it will list all cards with the colors black and red in their color. Note that while this search paramater is not case-sensitive, the order of listed colors must follow the pattern of WUBRG.</p>

            <h2> Exact Color Identity </h2>
            <p> A card&apos;s color identity is similar to it&apos;s colors, except that it also includes all colored symbols included in it&apos; rules text and is searched with the keyword cmm. All the same rules apply to searching by color, except that in this case the results will include only exactly matching color identities. For example the query: </p>
            <pre><code> cmm:G </code></pre>
            <p> Will return all cards that have an exact color identity of green. </p>
            
            <h2> Rarity </h2>
            <p> All cards in magic have one of a pre-determined set of rarities: </p>
            <ul>
                <li> Common </li>
                <li> Uncommon </li>
                <li> Rare </li>
                <li> Mythic </li>
                <li> Special </li>
                <li> Bonus </li>
            </ul>
            <p> It is possible to search for all cards of a specified rarity using the r or rarity keyword like so: </p>
            <pre><code> r:uncommon </code></pre>
            <pre><code> rarity:bonus </code></pre>


            <h2> Legality </h2>
            <p> There are many formats that one person can play the game in magic, and in each format there are a predetermined set of cards available to all players. In our database we keep track of the following formats: </p>
            <ul>
                <li> Commander </li>
                <li> Legacy </li>
                <li> Modern </li>
                <li> Pauper </li>
                <li> Pioneer </li>
                <li> Standard </li>
                <li> Vintage </li>
            </ul>
            <p> You can find all cards legal in a specified format using the l or legal keyword: </p>
            <pre><code> l:commander </code></pre>
            <pre><code> legal:pauper </code></pre>

            <h2> Type </h2>
            <p> Each card has a super type that is held within our database, these are the possible search parameters: </p>
            <ul>
                <li> Artifact </li>
                <li> Creature </li>
                <li> Enchantment </li>
                <li> Instant </li>
                <li> Land </li>
                <li> Planeswalker </li>
                <li> Sorcery </li>
            </ul>
            <p> You can find cards of a given type using the type keyword: </p>
            <pre><code> type:Artifact </code></pre>
            <pre><code> type:Creature </code></pre>

            <h2> Set </h2>
            <p> Cards in Magic the Gathering are released in big chunks called sets. Each set usually has a theme as well as new keywords or card types available to players. Each set also has it&apos;s own unique set code - usually a 3-6 character string of letters and numbers. A comprehensive list of all set codes can be found <a href="https://en.wikipedia.org/wiki/List_of_Magic:_The_Gathering_sets"> here on Wikipedia</a>. Searching for cards within a specified set can be done using the s or set keyword: </p>
            <pre><code> s:LEB </code></pre>
            <pre><code> set:M12 </code></pre>

            <h2> Using Query Paramaters in Conjunction </h2>
            <p> All of the previously defined parameters can be used in conjuction with each other to create search queries with more complex discriminations. Here are a few examples! </p>
            <p> Example 1: Black magic cards from the set core set Magic 2012 with both power and converted mana cost greater than 4. </p>
            <pre><code> s:M12 pow&gt;4 cmc&gt;4 color:B </code></pre>
            <p> Example 2: Cards with the word &quot;giant&quot; in the name with both power and toughness less than or equal to 1. </p>
            <pre><code> giant pow&lt;=1 tou&lt;=1 </code></pre>
            <p> Example 3: All common cards with strictly only white and blue in their color identity that are legal in vintage, and have a converted mana cost greater than 4. </p>
            <pre><code> l:vintage r:common cmc&gt;4 cmm:WU </code></pre>

        </div>
        </div>
    );
};

export default SearchHelp;
