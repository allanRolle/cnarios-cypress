# [Cnarios](https://www.cnarios.com/) in Cypress

<p>🚀 Challenges and real-world scenarios to learn automation using Cypress</p>
<img src='./assets/00-cnarios.png' width='100%'/>

## What is Cnarios ?
<p>📋 Cnarios is a free platform for testers to practice automation using real-life scenarios, industry-standard test cases, and bug-finding challenges. Learn concepts, sharpen your skills, and prepare for interviews — all in one place.</p>

👉 [www.cnarios.com](https://www.cnarios.com/)

## Challenges

<p>Each challenge will include positive test cases, negative test cases, and edge cases.</p>

<details>
    <summary>Button</summary><br/>
    <table>
        <tr>
            <th>Scenario</th>
            <th>Expected Result</th>
            <th>Type</th>
            <th>Priority</th>
        </tr>
        <tr>
            <td>Click Follow button when enabled</td>
            <td>Button text and icon should change to 'Following' with a check icon</td>
            <td>Positive</td>
            <td>High</td>
        </tr>
        <tr>
            <td>Tooltip visibility on hover</td>
            <td>Tooltip should display 'Click to follow' or 'Click to unfollow' based on state</td>
            <td>Positive</td>
            <td>Medium</td>
        </tr>
        <tr>
            <td>Follow button shows 'Processing...' text</td>
            <td>'Processing...' should appear before state changes and the button should be disabled</td>
            <td>Positive</td>
            <td>Medium</td>
        </tr>
        <tr>
            <td>Click Unfollow (toggle back)</td>
            <td>Button should return to Follow state after click</td>
            <td>Positive</td>
            <td>Medium</td>
        </tr>
        <tr>
            <td>Remove a suggestion card</td>
            <td>The selected suggestion card should be removed from the visible list</td>
            <td>Positive</td>
            <td>Medium</td>
        </tr>   
    </table>
    <table>
        <tr>
            <th>Scenario</th>
            <th>Expected result / risk identified</th>
            <th>Type</th>
            <th>Priority</th>
        </tr>
        <tr>
            <td>Unable to follow if button is desabled</td>
            <td>Button text should not change on click if button is desabled</td>
            <td>Negative</td>
            <td>Medium</td>
        </tr> 
        <tr>
            <td>Ignore clicks near button (missed clicks)</td>
            <td>User action is not precise</td>
            <td>Negative</td>
            <td>Medium</td>
        </tr>
        <tr>
            <td>Unable to follow if button is clicked multiple times (spam/debounce)</td>
            <td>Button is put under stress</td>
            <td>Positive</td>
            <td>Medium</td>
        </tr> 
        <tr>
            <td>Unable to follow if button is desabled</td>
            <td>Button text should not change on click if button is desabled</td>
            <td>Positive</td>
            <td>Medium</td>
        </tr>
        <tr>
            <td>Button remains functional when visually hidden</td>
            <td>Button is visually hidden</td>
            <td>Negative</td>
            <td>Medium</td>
        </tr>  
    </table>
    <img src='./assets/buttons.png' alt='buttons' width='100%'>
</details>

