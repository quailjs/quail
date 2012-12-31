===============================
Data tables should use scoped headers for rows with headers
===============================

*Severity code:* Possible error

.. php:class:: tableUsesScopeForRow


Where there are table headers for both rows and columns, use the "scope" attribute to help relate those headers with their appropriate cells. This test looks for the first and last cells in each row and sees if they differ in layout or font weight.

Example
-------
Wrong
-----

.. code-block:: html

    <table>
      <thead>
        <tr>
          <th>Should be scoped</th>
          <th>Item two</th>
          <th>Item three</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Row one</strong></td>
          <td>1</td>
          <td>2</td>
        </tr>
        <tr>
          <td><strong>Row two</strong></td>
          <td>1</td>
          <td>2</td>
        </tr>
      </tbody>
    </table>



Right
-----

.. code-block:: html

    <table>
      <thead>
        <tr>
          <th>Should be scoped</th>
          <th>Item two</th>
          <th>Item three</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"><strong>Row one</strong></th>
          <td>1</td>
          <td>2</td>
        </tr>
        <tr>
          <th scope="row">Row two</th>
          <td>1</td>
          <td>2</td>
        </tr>
      </tbody>
    </table>