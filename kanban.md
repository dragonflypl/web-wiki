# Kanban - Visual card

## FAQ

- What is the main goal of Kanban:
- Examples of kanban card:
- What are two main principles of Kanban:
- What is Lead Time
- Cycle Time equasion
- How to reduce Cycle Time
- What is personal kanban, what apps can be used?
 - Focus on completeness , not organization
 - Set up WIP limit (e.g. 3)
 - Every now and then, reflect on the kanban board (what went bad, good, well etc.)
- What is Value Stream?
- When prioritization is happening in Personal Kanban?
- When taking new stuff to Doing is happening in Personal Kanban?
- How to handle blocked tasks?
- How to handle stuff that we would like to have done during the day
- What Kanban says about planning?
- How to categorize & set priorities?

### Kanban in software development

-------

maximize flow
airport
view your work, minimize WIP
cycle time = WIP / throughput , wait time = length of queye / throughput, length of queue = throughput
Increase throughput (avg time to deliver service is lower) or reduce WIP



WIP = Total Time in the system (Lead Time) / Time required to work on single item (throughput/arrival rate?)


W = L / λ (Wait Time = Length of Queue / Arrival Rate)
Cycle Time = WIP / Throughput

W => (average) Wait Time or Cycle Time, średni czas przebywania w systemie lub response time
L => Length of the queue or WIP, średnia liczba rzeczy/klientów w systemie/kolejce;
λ => Arrival Rate or Throughput, średnie tempo przybywania (intensywność napływu zgłoszeń);

W = L / λ

Cycle Time = WIP / Throughput


L = W * λ

Value stream is a flow of steps that values go through (in preparatiion, ready, doing, waiting for qa, done)

- How to handle blocked tasks? Add Blocked state and also specify WIP limit for blocked state. Blocked state items have greater priotiry

- How to handle stuff that we would like to have done during the day? Well add Day section, at the beginning of the day put tasks that you're willing to start / do today

- What Kanban says about planning? Don't plan too much as it is an overhead

- How to categorize & set priorities?: Have 4 categories (non)urgent & (non)important. As for priorities, have a simple queue (no LOW/MEDIUM/HIGH etc...). Second approach to priorities is priority filters (two additional columns like PRIO1 and PRIO2 on the left side of READY (READY === PRIO0)): this gives two additional buckets for prioritization
