# SplunkuiShowCase

Ausprobieren des Unified Dashboard Framework von Splunk

__ACHTUNG:__ Diese Version ist eine Eigenentwicklung und entspricht nicht ganz der von Splunk vorgeschlagenen Vorgehensweise

## Ausführen

Zunächst als normale Splunk App unter SPLUNK_HOME/etc/apps ablegen

1. nodejs und npm installieren
2. in das Verzeichnis ```./react``` wechseln
3. ```npm install``` ausführen
4. ```npm run build``` ausführen



## Entwicklung:
5. ```npm run start``` ausführen
    - dann werden Änderungen im Quellcode direkt neu gebundelt
    - nach einem Reload des Dashboards sind Änderungen direkt zu sehen (ggf. _bump aufrufen und Browser Cahce deaktivieren)


## wichtige Dateien:

- ```./react/src/definition.json```
    - hier liegen die definitions für das Dashboard, d. h. das eigentliche Dashboard
    - Aufbau etc. so wie aus dem Dashboard Studio
    - die definition.json eines bestehenden Dashboard aus dem Dashboard Studio könnte hier eingefügt werden
    - die Weiterentwicklung eines Dashboards kann hier erfolgen

## Die restlichen Datien müssen (solange keine CustomVisualization eingefügt werden) nicht weiter beachtet werden:

- ```./local/data/views/demo.xml```
    - hier ist nur die Verlinkung zum html-Template
    - soll ein weiteres Dashboard angelegt werden, kann diese Datei kopiert werden (ggf. Pfade innerhalb der Datein anpassen)

- ```./appserver/templates/demo.html```
    - html-Gerüst zum Einbinden der JS-Dateien
    - soll ein weiteres Dashboard angelegt werden, kann diese kopiert weren (ggf. sollten Pfade innerhalb der Datei angepasst werden)

- ```./react```
    - ```./package.json```
        - hier werden benötigte JS-Bibliotheken aufgelistet, damit sie per npm installiert werden können
        - solange keine weiteren JS-Bibliotheken benötigt werden, muss hier nichts gemacht werden
    - ```./webpack.config.js```
        - Informationen, wie ein Script gebundelt werden soll
        - solange keine weiteren Einstiegsdateien (für ein weiteres Dashboard) hinzukommen, muss hier nichts weitergemacht werden 
        - falls eine weitere Datei für ein weiteres Dashboard eingefügt werden soll

            ```javascript 
                entry: {
                    demo: './src/demo.js'
                },
            ```
        -  unter entry einen weiteren Eintrag mit Namen und Pfad zum Einstiegs-JS erzeugen
- ```./src/demo.js```
    - Einstiegsdatei dieses Dashboards
    - dies ist eigentlich in jedem Dashboard gleich 
    - hier kann ggf. der Title des Dashboards angepasst werden (Tab-Beschriftung im Browser)
- ```./src/DashboardExample.jsx```
    - hier wird das Dashboard initialisiert
    - solange keine Custom Visualisierungen etc. hinzukommen, muss auch hier nichts angepasst werden

## Dateien, die erst aus den npm Befehlen automatisch entstehen

- ```./appserver/static/react```
    - hier liegen die gebundelten JS-Dateien

- ```./react/node_modules```
    - entsteht erst nach einem ```npm install```
    - hier liegen die JS-Bibliotheken, die in der ```package.json``` angegeben wurden

